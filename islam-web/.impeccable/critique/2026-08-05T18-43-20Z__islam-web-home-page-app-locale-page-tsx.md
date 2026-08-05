---
target: islam-web home page (app/[locale]/page.tsx)
total_score: 22
max_score: 28
na_heuristics: 5,9,10
p0_count: 0
p1_count: 1
timestamp: 2026-08-05T18-43-20Z
slug: islam-web-home-page-app-locale-page-tsx
---
Method: DEGRADED: single-context (no sub-agent spawning without explicit user request)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Good hover/focus/theme feedback; no signal that "Explorar" leads to an empty page |
| 2 | Match System / Real World | 2 | Home promises full Quran/Hadith/Duas; all 9 destination routes are "coming soon" |
| 3 | User Control and Freedom | 3 | Nav always reachable, Escape closes modal; stub pages lack their own way back |
| 4 | Consistency and Standards | 3 | Consistent token system; one real inconsistency: pillars tabs are 36px tall vs 44px elsewhere |
| 5 | Error Prevention | n/a | No forms or destructive actions yet (phase 1) |
| 6 | Recognition Rather Than Recall | 4 | Text labels throughout, icons always paired with text, visible Cmd+K hint |
| 7 | Flexibility and Efficiency | 3 | Real Cmd+K accelerator; nothing else accelerated, reasonable for a landing page |
| 8 | Aesthetic and Minimalist Design | 4 | Clean hierarchy, restrained palette, nothing competes for attention |
| 9 | Error Recovery | n/a | No errors possible yet (static content) |
| 10 | Help and Documentation | n/a | Correctly absent on a Persuade-mode landing page |
| Total | | 22/28 | Good (79%) |

## Design Specificity Verdict

LLM assessment: palette (emerald + gold, deliberately not the generic lavender of "spiritual app" conventions), type pairing (Cormorant Garamond + Inter + isolated Amiri for Arabic), Islamic geometric background pattern, and the "Nur" name are genuinely anchored in the product. The structural pattern (hero -> 6-card grid -> tabs -> CTA band) is a conventional landing-page shape; reasonable for Persuade mode but not itself surprising.

Deterministic scan: detect.mjs over app/, components/, public/ -> 0 findings (clean).

Visual overlays: not applicable in this headless remote environment (no human-visible browser tab). Used Playwright screenshots (desktop light/dark, mobile, keyboard trace) as evidence instead.

## Overall Impression

Visually solid and coherent. The dominant friction today is that every primary action (both hero CTAs, all 6 cards, Preguntas, Favoritos, Notas) ends on the same generic "coming soon" screen -- expected per the phase-1 roadmap, not an oversight, but real friction for a visitor today.

## What's Working

- Color system with real cultural intent (emerald/gold instead of generic wellness-app lavender)
- Keyboard accessibility: logical tab order, visible focus rings, working Cmd+K shortcut
- The recent motion pass reads as intentional (proper easing curves), not decorative

## Priority Issues

[P1] Every destination promises content, delivers an identical placeholder
Why it matters: a real visitor today clicks any of 9 destinations and finds the same icon+text "coming soon" screen every time, eroding trust before real content exists.
Fix: not a flaw in the home page itself -- expected in phase 1 -- but the shared ComingSoon component could carry more per-page context (an estimated date, or a "notify me" link) instead of being identical across all 9 routes.
Suggested command: $impeccable onboard

[P2] Both hero CTAs lead to the same place
Why it matters: "Comenzar a aprender" and "Leer el Coran" look like two distinct decisions but both resolve to /coran identically; "Comenzar a aprender" over-promises something broader than a single surah.
Fix: differentiate destinations, or merge into a single CTA if there is no second real path yet.
Suggested command: $impeccable clarify

[P2] Favoritos and Notas have no visible entry point
Why it matters: perfil/favoritos and perfil/notas exist in code but no nav surface (header, footer, mobile menu) links to them -- invisible to anyone who doesn't type the URL directly.
Fix: give them an "account" entry point when phase-4 login ships, or drop them from the build until then to avoid phantom routes.
Suggested command: $impeccable layout

[P3] Pillars tabs are 36px tall
Why it matters: below the 44x44px touch target DESIGN_SYSTEM.md itself requires; the only control that violates its own rule.
Fix: raise TabsTrigger from h-9 to h-11 in components/ui/tabs.tsx.
Suggested command: $impeccable adapt

## Persona Red Flags

Jordan (confused first-timer): clicks "Comenzar a aprender" expecting guidance, lands on the same "coming soon" screen as any other card. No "notify me" affordance, likely won't return.

Riley (stress tester): no real breakage found -- rapid tab switching between Islam/Faith pillars doesn't glitch, refreshing mid-scroll resets and replays reveals correctly, empty search queries show the "no results" state correctly. Worth stating explicitly rather than inventing an issue.

Casey (distracted mobile user): all touch targets meet 44px except the pillars tabs (see P3). Hero CTAs aren't pushed to the bottom thumb zone, but that's the expected pattern for a scrolling landing page, not a real defect here.

## Minor Observations

- Header has 6 visible top-level links, just above the <=5 cognitive-load guideline before grouping; Preguntas is footer/mobile-menu only, which is fine.
- Hero geometric background pattern is barely visible -- correct per brief (5-8% opacity, never competing with text), confirmed it doesn't interfere with reading.

## Questions to Consider

- Is it worth having the "coming soon" pages capture an email instead of being a dead end?
- With Favoritos/Notas already built but invisible, do we hide them entirely until phase 4, or preview them as "coming soon" too?
