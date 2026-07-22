(function () {
  "use strict";

  window.__BRAND__ = {
    name: "Maison Suzi",
    tagline: "Horneado con pasión",

    contact: {
      whatsappDisplay: "+34 600 000 000",
      whatsappLink: "https://wa.me/34600000000",
      instagramHandle: "@maisonsuzi",
      instagramLink: "https://instagram.com/maisonsuzi",
      city: "Reparto a domicilio"
    },

    categories: [
      { id: "tartas", name: "Tartas & naked cakes" },
      { id: "individuales", name: "Eclairs, tartaletas & vasitos" },
      { id: "cumple", name: "Pasteles de cumpleaños" }
    ],

    products: [
      {
        id: "cheesecake",
        category: "tartas",
        name: "Tarta de queso clásica",
        desc: "Horneada despacio, base dorada y un baño de caramelo casero.",
        icon: "cheesecake"
      },
      {
        id: "naked-frutos",
        category: "tartas",
        name: "Naked cake de frutos rojos",
        desc: "Capas ligeras, crema suave y un jardín de frutas de temporada.",
        icon: "layer-cake"
      },
      {
        id: "cookie-pistacho",
        category: "tartas",
        name: "Cookie cake de pistacho y frambuesa",
        desc: "Galleta gruesa horneada en molde, pistacho crocante y chocolate.",
        icon: "cookie"
      },
      {
        id: "eclair",
        category: "individuales",
        name: "Eclair de frutos rojos",
        desc: "Choux relleno de crema, glaseado brillante y fruta fresca.",
        icon: "eclair"
      },
      {
        id: "vasito-galleta",
        category: "individuales",
        name: "Vasito de galleta y frutos rojos",
        desc: "Capas de galleta, crema y mermelada casera, coronado con macaron.",
        icon: "cup"
      },
      {
        id: "tiramisu",
        category: "individuales",
        name: "Tiramisú clásico en vasito",
        desc: "Receta tradicional italiana, cacao amargo y un toque de café.",
        icon: "tiramisu"
      },
      {
        id: "cumpleanos",
        category: "cumple",
        name: "Pastel de cumpleaños a medida",
        desc: "Diseñado contigo: rellenos, colores y decoración para tu ocasión.",
        icon: "birthday"
      }
    ],

    process: [
      {
        n: "01",
        title: "Elige tus dulces",
        desc: "Explora el catálogo y elige lo que más te tiente, o cuéntanos tu idea."
      },
      {
        n: "02",
        title: "Escríbenos por WhatsApp",
        desc: "Coméntanos fecha, cantidad y cualquier detalle especial de tu pedido."
      },
      {
        n: "03",
        title: "Horneamos con cariño",
        desc: "Suzan prepara cada pieza a mano, con ingredientes frescos y tiempo."
      },
      {
        n: "04",
        title: "Entrega a domicilio",
        desc: "Recibe tu pedido bien empacado, listo para sorprender."
      }
    ]
  };
})();
