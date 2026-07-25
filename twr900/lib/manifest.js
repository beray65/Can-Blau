/*!
 * TWR900 — brand + catalog data
 * Exposes window.__BRAND__ only (IIFE, no globals leaked).
 */
(function () {
  "use strict";

  // ---------------------------------------------------------------------
  // Colorway palettes — reused across products. Each palette drives the
  // inline boot illustration (upper / sole / toe / collar / tongue / lace).
  // ---------------------------------------------------------------------
  var PALETTES = {
    "negro-blanco": { name: "Negro / Blanco", swatch: "#0A0A0A", swatch2: "#FFFFFF",
      upper: "#0E0E0E", sole: "#F5F5F5", toe: "#1B1B1B", collar: "#161616", tongue: "#F2F2F2", lace: "#FFFFFF" },
    "voltage": { name: "Azul Eléctrico", swatch: "#0E1220", swatch2: "#2F5DFF",
      upper: "#10152A", sole: "#2F5DFF", toe: "#0B0E1C", collar: "#171D38", tongue: "#2F5DFF", lace: "#EAF0FF" },
    "ghost": { name: "Blanco / Gris", swatch: "#FFFFFF", swatch2: "#B9BEC7",
      upper: "#F4F5F7", sole: "#C7CCD4", toe: "#E6E8EC", collar: "#ECEDF0", tongue: "#FFFFFF", lace: "#0A0A0A" },
    "combate": { name: "Rojo Combate", swatch: "#1A0A0A", swatch2: "#D61F2C",
      upper: "#1C0B0B", sole: "#D61F2C", toe: "#120707", collar: "#210D0D", tongue: "#D61F2C", lace: "#FFFFFF" },
    "tatami": { name: "Verde Tatami", swatch: "#0B1712", swatch2: "#1FA35C",
      upper: "#0D1A14", sole: "#1FA35C", toe: "#081210", collar: "#122019", tongue: "#1FA35C", lace: "#F2F2F2" },
    "arena": { name: "Oro Arena", swatch: "#171310", swatch2: "#D9A441",
      upper: "#1A1512", sole: "#D9A441", toe: "#100D0B", collar: "#201B16", tongue: "#D9A441", lace: "#F2F2F2" },
    "grafito": { name: "Grafito", swatch: "#26282C", swatch2: "#8B93A1",
      upper: "#2B2D31", sole: "#9AA1AD", toe: "#1E2023", collar: "#232529", tongue: "#C6CBD3", lace: "#F2F2F2" },
    "vino": { name: "Vino", swatch: "#1C0E12", swatch2: "#7A1F35",
      upper: "#1F1116", sole: "#7A1F35", toe: "#140A0D", collar: "#241318", tongue: "#7A1F35", lace: "#F2F2F2" }
  };

  function colorway(id) {
    var p = PALETTES[id];
    return { id: id, name: p.name, swatch: p.swatch, swatch2: p.swatch2, palette: p };
  }

  var SIZES = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46];

  // ---------------------------------------------------------------------
  // Products — 3 per category. Prices in EUR.
  // ---------------------------------------------------------------------
  var products = [
    {
      id: "exeo-blackout",
      slug: "asics-ex-eo-blackout",
      name: "Asics EX-EO “Blackout”",
      category: "ex-eo",
      categoryLabel: "Asics EX-EO",
      price: 139.95,
      compareAtPrice: 159.95,
      rating: 4.8,
      reviewCount: 214,
      badges: ["Novedad", "Más vendida"],
      shortDescription: "La bota más ligera de la gama EX-EO, pensada para el freestyle de alta velocidad.",
      description: "La Asics EX-EO “Blackout” redefine la ligereza en el tapiz. Con una horma ceñida tipo calcetín y una suela de competición sin tracción residual, ofrece un contacto directo con la lona que permite cambios de nivel instantáneos. Diseñada junto a luchadores de nivel internacional para freestyle y grecorromana, es la elección de quienes no quieren notar la bota en absoluto.",
      features: ["Peso pluma: 198 g por bota (talla 42)", "Suela de competición de agarre direccional", "Malla microperforada de alta transpirabilidad", "Ajuste tipo calcetín, cero puntos de rozadura", "Caña media flexible para movilidad total de tobillo", "Homologada para freestyle y grecorromana"],
      sizes: SIZES,
      colors: [colorway("negro-blanco"), colorway("voltage"), colorway("ghost")],
      shipping: "Envío 24–48h en península. Devolución gratuita en 30 días.",
      angle: -6
    },
    {
      id: "exeo-ghostwhite",
      slug: "asics-ex-eo-ghost-white",
      name: "Asics EX-EO “Ghost White”",
      category: "ex-eo",
      categoryLabel: "Asics EX-EO",
      price: 139.95,
      compareAtPrice: null,
      rating: 4.7,
      reviewCount: 96,
      badges: ["Novedad"],
      shortDescription: "Misma ingeniería EX-EO en un colorway limpio pensado para competición.",
      description: "Toda la tecnología de la EX-EO en un acabado blanco inmaculado. Ideal para quien busca destacar en el tapiz sin renunciar a un solo gramo de rendimiento. La entresuela de perfil bajo mantiene el centro de gravedad pegado al suelo, clave en las luchas de posición baja.",
      features: ["Peso pluma: 201 g por bota (talla 42)", "Suela de competición de agarre direccional", "Malla microperforada de alta transpirabilidad", "Ajuste tipo calcetín, cero puntos de rozadura", "Refuerzo en zona de metatarso", "Homologada para freestyle y grecorromana"],
      sizes: SIZES,
      colors: [colorway("ghost"), colorway("negro-blanco"), colorway("grafito")],
      shipping: "Envío 24–48h en península. Devolución gratuita en 30 días.",
      angle: 5
    },
    {
      id: "exeo-voltage",
      slug: "asics-ex-eo-voltage",
      name: "Asics EX-EO “Voltage”",
      category: "ex-eo",
      categoryLabel: "Asics EX-EO",
      price: 144.95,
      compareAtPrice: null,
      rating: 4.9,
      reviewCount: 158,
      badges: ["Edición limitada"],
      shortDescription: "El colorway insignia de TWR900. Azul eléctrico de borde a borde.",
      description: "La edición Voltage es la interpretación de TWR900 del rendimiento puro: azul eléctrico sobre base grafito, diseñada para luchadores que compiten para ganar, no para participar. Misma plataforma ultraligera de la EX-EO, con refuerzos adicionales en la zona de flexión del pie.",
      features: ["Peso pluma: 199 g por bota (talla 42)", "Suela de competición de agarre direccional", "Malla microperforada de alta transpirabilidad", "Refuerzo de flexión en antepié", "Caña media flexible", "Edición limitada TWR900"],
      sizes: SIZES,
      colors: [colorway("voltage"), colorway("negro-blanco"), colorway("combate")],
      shipping: "Envío 24–48h en península. Devolución gratuita en 30 días.",
      angle: -4
    },
    {
      id: "snapdown-heritage",
      slug: "asics-snapdown-3-heritage",
      name: "Asics Snapdown 3 “Heritage”",
      category: "snapdown",
      categoryLabel: "Asics Snapdown",
      price: 99.95,
      compareAtPrice: 109.95,
      rating: 4.7,
      reviewCount: 301,
      badges: ["Más vendida"],
      shortDescription: "La bota todoterreno de club: equilibrio perfecto entre soporte y libertad de movimiento.",
      description: "La Snapdown 3 es la bota de referencia en salas de todo el mundo. Combina una entresuela con amortiguación moderada, un exterior de piel sintética resistente al roce en el tapiz y un sistema de cordones reforzado con ojales metálicos. Perfecta para entrenamientos exigentes semana tras semana.",
      features: ["Piel sintética de alta resistencia a la abrasión", "Entresuela EVA de amortiguación moderada", "Ojales metálicos reforzados", "Suela de goma de alta durabilidad", "Caña alta con acolchado en tobillo", "Apta para freestyle, grecorromana y folkstyle"],
      sizes: SIZES,
      colors: [colorway("negro-blanco"), colorway("tatami"), colorway("grafito")],
      shipping: "Envío 24–48h en península. Devolución gratuita en 30 días.",
      angle: 6
    },
    {
      id: "snapdown-combat",
      slug: "asics-snapdown-3-combat-red",
      name: "Asics Snapdown 3 “Combat Red”",
      category: "snapdown",
      categoryLabel: "Asics Snapdown",
      price: 99.95,
      compareAtPrice: null,
      rating: 4.6,
      reviewCount: 187,
      badges: [],
      shortDescription: "Toda la durabilidad de la Snapdown 3 con una actitud más agresiva.",
      description: "Rojo combate sobre base negra: la Snapdown 3 en su versión más intensa. Mismo chasis probado en cientos de salas, con un exterior que resiste sesión tras sesión sin perder forma ni agarre.",
      features: ["Piel sintética de alta resistencia a la abrasión", "Entresuela EVA de amortiguación moderada", "Ojales metálicos reforzados", "Suela de goma de alta durabilidad", "Caña alta con acolchado en tobillo", "Apta para freestyle, grecorromana y folkstyle"],
      sizes: SIZES,
      colors: [colorway("combate"), colorway("negro-blanco"), colorway("arena")],
      shipping: "Envío 24–48h en península. Devolución gratuita en 30 días.",
      angle: -5
    },
    {
      id: "snapdown-tatami",
      slug: "asics-snapdown-2-tatami-green",
      name: "Asics Snapdown 2 “Tatami Green”",
      category: "snapdown",
      categoryLabel: "Asics Snapdown",
      price: 89.95,
      compareAtPrice: null,
      rating: 4.5,
      reviewCount: 122,
      badges: ["Precio club"],
      shortDescription: "La generación anterior de la Snapdown, a un precio pensado para equipos.",
      description: "Ideal para clubes que equipan a categorías inferiores: toda la fiabilidad de la familia Snapdown con un coste ajustado para compras en volumen. Sigue integrando el sistema de ojales reforzados y la suela de goma de alta durabilidad.",
      features: ["Piel sintética resistente a la abrasión", "Entresuela EVA de amortiguación moderada", "Ojales reforzados", "Suela de goma duradera", "Caña alta acolchada", "Ideal para equipación de club"],
      sizes: SIZES,
      colors: [colorway("tatami"), colorway("negro-blanco")],
      shipping: "Envío 24–48h en península. Devolución gratuita en 30 días.",
      angle: 4
    },
    {
      id: "aggressor-steel",
      slug: "asics-aggressor-5-steel",
      name: "Asics Aggressor 5 “Steel”",
      category: "aggressor",
      categoryLabel: "Asics Aggressor",
      price: 124.95,
      compareAtPrice: null,
      rating: 4.8,
      reviewCount: 264,
      badges: ["Más vendida"],
      shortDescription: "Máximo soporte y durabilidad para quien entrena y compite sin parar.",
      description: "La Aggressor 5 es la bota de trabajo duro: pensada para atletas de folkstyle y grecorromana que necesitan soporte lateral extra y una suela capaz de aguantar un curso completo de competición. Caña alta con refuerzo estructural y sistema de sujeción de doble capa.",
      features: ["Caña alta con refuerzo estructural lateral", "Suela de goma reforzada de alta durabilidad", "Sistema de sujeción de doble capa (cordones + correa)", "Entresuela de compresión moderada para impacto en derribos", "Puntera reforzada anti-desgaste", "Ideal para grecorromana y folkstyle"],
      sizes: SIZES,
      colors: [colorway("grafito"), colorway("negro-blanco"), colorway("voltage")],
      shipping: "Envío 24–48h en península. Devolución gratuita en 30 días.",
      angle: -6
    },
    {
      id: "aggressor-inferno",
      slug: "asics-aggressor-5-inferno",
      name: "Asics Aggressor 5 “Inferno”",
      category: "aggressor",
      categoryLabel: "Asics Aggressor",
      price: 124.95,
      compareAtPrice: 134.95,
      rating: 4.7,
      reviewCount: 143,
      badges: ["Oferta"],
      shortDescription: "La Aggressor 5 en un colorway hecho para intimidar en el círculo central.",
      description: "Misma estructura reforzada de la Aggressor 5, con un exterior en tonos cálidos que no pasa desapercibido. Para atletas que llevan la presión del combate también en el calzado.",
      features: ["Caña alta con refuerzo estructural lateral", "Suela de goma reforzada de alta durabilidad", "Sistema de sujeción de doble capa (cordones + correa)", "Entresuela de compresión moderada para impacto en derribos", "Puntera reforzada anti-desgaste", "Ideal para grecorromana y folkstyle"],
      sizes: SIZES,
      colors: [colorway("arena"), colorway("combate"), colorway("negro-blanco")],
      shipping: "Envío 24–48h en península. Devolución gratuita en 30 días.",
      angle: 5
    },
    {
      id: "aggressor-arena",
      slug: "asics-aggressor-4-arena-gold",
      name: "Asics Aggressor 4 “Arena Gold”",
      category: "aggressor",
      categoryLabel: "Asics Aggressor",
      price: 109.95,
      compareAtPrice: null,
      rating: 4.6,
      reviewCount: 88,
      badges: [],
      shortDescription: "La generación anterior de la Aggressor, robusta y probada en cientos de tapices.",
      description: "Para quien prioriza durabilidad sobre última generación: la Aggressor 4 mantiene el ADN de soporte y resistencia de la familia a un precio más accesible, con un acabado dorado que destaca en el podio.",
      features: ["Caña alta con refuerzo lateral", "Suela de goma de alta durabilidad", "Sistema de sujeción de doble capa", "Puntera reforzada", "Ideal para grecorromana y folkstyle"],
      sizes: SIZES,
      colors: [colorway("arena"), colorway("vino")],
      shipping: "Envío 24–48h en península. Devolución gratuita en 30 días.",
      angle: -5
    }
  ];

  // ---------------------------------------------------------------------
  // Reviews pool — distributed across products (see main.js pickReviews)
  // ---------------------------------------------------------------------
  var reviewPool = [
    { name: "Marcos I.", rating: 5, title: "Notas cero peso en el tapiz", body: "Vengo de una bota genérica y el salto es brutal. En el segundo asalto se me olvida que las llevo puestas, que es justo lo que busco en freestyle." },
    { name: "Laia V.", rating: 5, title: "Agarre increíble desde el primer entreno", body: "Cambio de nivel sin resbalar ni una vez en tres semanas de uso intensivo. La suela mant iene el agarre incluso con la lona húmeda de sudor." },
    { name: "Diego R.", rating: 4, title: "Muy buena, tallan justas", body: "Calidad excelente, se nota la diferencia frente a marcas genéricas. Único pero: pide media talla más si tienes el pie ancho." },
    { name: "Nerea S.", rating: 5, title: "Mi club entero las lleva ya", body: "Las compramos para todo el equipo juvenil y ni una queja en toda la temporada. El servicio de TWR900 también fue rápidísimo." },
    { name: "Iker A.", rating: 5, title: "Soporte de tobillo que se nota en derribos", body: "Llevo dos temporadas compitiendo en grecorromana con esta gama y el soporte lateral marca la diferencia en los derribos por sorpresa." },
    { name: "Carla M.", rating: 4, title: "Duraderas de verdad", body: "Entreno cinco días por semana y siguen intactas después de cuatro meses. La puntera reforzada aguanta bien el roce constante con la lona." },
    { name: "Bruno T.", rating: 5, title: "El colorway Voltage es otro nivel", body: "Además de rendir, tienen una pinta espectacular en el tapiz. Recibí varios comentarios en el último torneo." },
    { name: "Andrea F.", rating: 5, title: "Transpirabilidad top en sesiones largas", body: "Entreno en un pabellón sin climatizar y el pie no se me ahoga ni en sesiones de dos horas. Se secan rápido entre asaltos." },
    { name: "Héctor P.", rating: 4, title: "Gran relación calidad-precio", body: "Para equipar a categorías inferiores del club es una opción excelente: fiabilidad de la gama superior a un coste asumible." }
  ];

  // ---------------------------------------------------------------------
  // Categories
  // ---------------------------------------------------------------------
  var categories = [
    {
      id: "ex-eo",
      name: "Asics EX-EO",
      tagline: "Ligereza absoluta",
      description: "La gama más ligera para freestyle de alta velocidad. Contacto directo con la lona, cero gramos de más.",
      cta: "Ver colección"
    },
    {
      id: "snapdown",
      name: "Asics Snapdown",
      tagline: "El estándar de club",
      description: "Equilibrio entre soporte, durabilidad y libertad de movimiento. La bota más vendida en salas de todo el mundo.",
      cta: "Ver colección"
    },
    {
      id: "aggressor",
      name: "Asics Aggressor",
      tagline: "Soporte total",
      description: "Caña alta y refuerzo estructural para grecorromana y folkstyle. Construidas para aguantar un curso entero.",
      cta: "Ver colección"
    }
  ];

  // ---------------------------------------------------------------------
  // Benefits / testimonials / faqs
  // ---------------------------------------------------------------------
  var benefits = [
    { icon: "🚚", title: "Envío rápido", text: "24–48h en península. Envíos a toda Europa en 3–5 días." },
    { icon: "🔄", title: "Devolución sencilla", text: "30 días para cambiar de talla o devolver, sin preguntas." },
    { icon: "⭐", title: "Productos originales", text: "Distribuidor autorizado. 100% Asics originales, garantía incluida." },
    { icon: "🏆", title: "Usadas en competición", text: "El mismo calzado que calzan luchadores de nivel nacional e internacional." }
  ];

  var testimonials = [
    { name: "Marcos Iglesias", role: "Freestyle · Club León Lucha", rating: 5, quote: "Desde que cambié a la EX-EO noto los cambios de nivel muchísimo más rápidos. Es la bota más ligera que he probado en diez años compitiendo." },
    { name: "Laia Vidal", role: "Grecorromana · Selección Junior", rating: 5, quote: "El agarre en la Aggressor es una barbaridad. No he vuelto a resbalar en un derribo desde que las llevo puestas." },
    { name: "Diego Ramos", role: "Entrenador · C.D. Tapiz Norte", rating: 5, quote: "Equipamos a todo el club juvenil con Snapdown y el ahorro en reposiciones ha sido notable. Aguantan una temporada entera sin despeinarse." },
    { name: "Nerea Soto", role: "Folkstyle · Universidad de Zaragoza", rating: 4, quote: "TWR900 entiende de lucha, no solo de vender zapatillas. El asesoramiento de talla fue clave para acertar a la primera." },
    { name: "Iker Aguirre", role: "Grecorromana · Club Vasco de Lucha", rating: 5, quote: "El soporte de tobillo de la Aggressor 5 me ha salvado de más de una torcedura en derribos por sorpresa." }
  ];

  var faqs = [
    { q: "¿Cómo elijo mi talla correcta?", a: "Consulta nuestra guía de tallas: mide tu pie descalzo, en cm, a final del día, y compara con la tabla EU/US/UK. Ante la duda entre dos tallas, elige siempre la superior: las botas de lucha se ajustan pero no deben oprimir." },
    { q: "¿Cuánto tarda el envío?", a: "24–48h en península y Baleares, 2–4 días en Canarias, y 3–5 días laborables al resto de Europa. Recibirás un código de seguimiento en cuanto salga del almacén." },
    { q: "¿Puedo devolver mis botas si no me valen?", a: "Sí, dispones de 30 días desde la recepción para devolverlas sin usar y en su embalaje original. Gestionamos el cambio de talla sin coste adicional de envío." },
    { q: "¿Son aptas para competición oficial?", a: "Sí, todos los modelos EX-EO, Snapdown y Aggressor cumplen la normativa de UWW para freestyle, grecorromana y folkstyle." },
    { q: "¿Vendéis a clubes y equipos?", a: "Sí, tenemos precios especiales para pedidos de equipación de club a partir de 8 pares. Escríbenos desde la página de contacto." }
  ];

  var sizeChart = [
    { eu: 36, us: 4, uk: 3.5, cm: 22.5 },
    { eu: 37, us: 5, uk: 4, cm: 23.5 },
    { eu: 38, us: 5.5, uk: 4.5, cm: 24 },
    { eu: 39, us: 6.5, uk: 5.5, cm: 24.5 },
    { eu: 40, us: 7, uk: 6, cm: 25.5 },
    { eu: 41, us: 8, uk: 7, cm: 26 },
    { eu: 42, us: 8.5, uk: 7.5, cm: 27 },
    { eu: 43, us: 9.5, uk: 8.5, cm: 27.5 },
    { eu: 44, us: 10, uk: 9, cm: 28.5 },
    { eu: 45, us: 11, uk: 10, cm: 29 },
    { eu: 46, us: 12, uk: 11, cm: 30 }
  ];

  window.__BRAND__ = {
    name: "TWR900",
    tagline: "Performance Starts From The Ground",
    year: 2026,
    contact: { email: "hola@twr900.com", phone: "+34 900 100 900", address: "C. del Tapiz 9, 28001 Madrid" },
    palettes: PALETTES,
    products: products,
    reviewPool: reviewPool,
    categories: categories,
    benefits: benefits,
    testimonials: testimonials,
    faqs: faqs,
    sizeChart: sizeChart
  };
})();
