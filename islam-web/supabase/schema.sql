-- =========================================================
-- Esquema Supabase — Web de aprendizaje del Islam
-- Ejecutar en el SQL Editor de Supabase o vía migraciones.
-- Las tablas de contenido (surahs, ayahs, hadith_*, duas,
-- library_books) se rellenan con los scripts de scripts/ usando
-- la service_role key, que no pasa por RLS. Por eso solo llevan
-- policies de lectura: no hace falta abrir escritura pública.
-- =========================================================

create extension if not exists "pgcrypto";  -- gen_random_uuid()
create extension if not exists "pg_trgm";   -- búsqueda difusa opcional

-- ---------------------------------------------------------
-- Perfiles (extiende auth.users)
-- ---------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  avatar_url text,
  preferred_language text not null default 'es',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

-- ---------------------------------------------------------
-- Corán
-- ---------------------------------------------------------
create table public.surahs (
  number smallint primary key check (number between 1 and 114),
  name_ar text not null,
  name_transliteration text not null,
  name_es text not null,
  revelation_type text not null check (revelation_type in ('meca', 'medina')),
  ayah_count smallint not null
);

create table public.ayahs (
  id bigint generated always as identity primary key,
  surah_number smallint not null references public.surahs(number) on delete cascade,
  ayah_number smallint not null,
  text_ar text not null,
  text_transliteration text,
  text_es text not null,
  audio_url text,
  juz smallint,
  page smallint,
  unique (surah_number, ayah_number)
);

create index idx_ayahs_search_es on public.ayahs
  using gin (to_tsvector('spanish', text_es));

alter table public.surahs enable row level security;
alter table public.ayahs enable row level security;

create policy "surahs_public_read" on public.surahs for select using (true);
create policy "ayahs_public_read" on public.ayahs for select using (true);

-- ---------------------------------------------------------
-- Hadices
-- ---------------------------------------------------------
create table public.hadith_collections (
  id text primary key,  -- 'bukhari' | 'muslim' | 'riyad-as-salihin' | 'nawawi-40'
  name_ar text not null,
  name_es text not null,
  description_es text
);

create table public.hadith_books (
  id bigint generated always as identity primary key,
  collection_id text not null references public.hadith_collections(id) on delete cascade,
  book_number int not null,
  name_ar text,
  name_es text not null,
  unique (collection_id, book_number)
);

create table public.hadiths (
  id bigint generated always as identity primary key,
  collection_id text not null references public.hadith_collections(id) on delete cascade,
  book_id bigint references public.hadith_books(id) on delete set null,
  hadith_number text not null,
  narrator_es text,
  text_ar text not null,
  text_es text,  -- nullable: la traducción española llega después, de forma manual/revisada
  grade text check (grade in ('sahih', 'hasan', 'daif', 'no_aplica')),
  reference text not null,
  unique (collection_id, hadith_number)
);

create index idx_hadiths_search_es on public.hadiths
  using gin (to_tsvector('spanish', coalesce(text_es, '')));

alter table public.hadith_collections enable row level security;
alter table public.hadith_books enable row level security;
alter table public.hadiths enable row level security;

create policy "hadith_collections_public_read" on public.hadith_collections for select using (true);
create policy "hadith_books_public_read" on public.hadith_books for select using (true);
create policy "hadiths_public_read" on public.hadiths for select using (true);

-- ---------------------------------------------------------
-- Duas
-- ---------------------------------------------------------
create table public.duas (
  id bigint generated always as identity primary key,
  category text not null,  -- 'manana' | 'noche' | 'comida' | 'viaje' | 'entrar_salir_casa' | ...
  title_es text not null,
  text_ar text not null,
  text_transliteration text,
  text_es text not null,
  audio_url text,
  source_reference text,   -- p.ej. 'Hisnul Muslim, cap. 3'
  order_index int not null default 0
);

alter table public.duas enable row level security;
create policy "duas_public_read" on public.duas for select using (true);

-- ---------------------------------------------------------
-- Biblioteca
-- ---------------------------------------------------------
create table public.library_books (
  id bigint generated always as identity primary key,
  category text not null check (category in ('aqidah','fiqh','sirah','tafsir','historia','etica')),
  title text not null,
  author text,
  description_es text,
  cover_url text,
  pdf_url text,       -- null si los derechos no permiten distribución
  external_url text,
  created_at timestamptz not null default now()
);

alter table public.library_books enable row level security;
create policy "library_books_public_read" on public.library_books for select using (true);

-- ---------------------------------------------------------
-- Contenido editorial: artículos y preguntas
-- ---------------------------------------------------------
create table public.articles (
  id bigint generated always as identity primary key,
  slug text unique not null,
  title text not null,
  content_md text not null,
  language text not null default 'es',
  status text not null default 'draft' check (status in ('draft','published')),
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.qa_questions (
  id bigint generated always as identity primary key,
  question text not null,
  answer_md text not null,
  sources jsonb not null default '[]',  -- [{ "type": "ayah", "ref": "2:255" }, { "type": "hadith", "ref": "bukhari:1" }]
  language text not null default 'es',
  reviewed_by text,
  reviewed_at timestamptz,
  status text not null default 'draft' check (status in ('draft','published')),
  created_at timestamptz not null default now()
);

alter table public.articles enable row level security;
alter table public.qa_questions enable row level security;

create policy "articles_public_read_published"
  on public.articles for select using (status = 'published');

create policy "qa_questions_public_read_published"
  on public.qa_questions for select using (status = 'published');

-- ---------------------------------------------------------
-- Datos del usuario: favoritos, progreso, notas
-- ---------------------------------------------------------
create table public.favorites (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  item_type text not null check (item_type in ('ayah','hadith','dua')),
  item_ref text not null,  -- '2:255' | 'bukhari:1' | 'dua:12'
  created_at timestamptz not null default now(),
  unique (user_id, item_type, item_ref)
);

create table public.reading_progress (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  surah_number smallint references public.surahs(number),
  ayah_number smallint,
  updated_at timestamptz not null default now(),
  unique (user_id)
);

create table public.notes (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  item_type text not null check (item_type in ('ayah','hadith','dua')),
  item_ref text not null,
  note_text text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.favorites enable row level security;
alter table public.reading_progress enable row level security;
alter table public.notes enable row level security;

create policy "favorites_owner_all" on public.favorites
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "reading_progress_owner_all" on public.reading_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "notes_owner_all" on public.notes
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Mantiene notes.updated_at al día en cada edición
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger notes_set_updated_at
  before update on public.notes
  for each row execute function public.set_updated_at();
