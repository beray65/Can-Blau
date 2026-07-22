(function () {
  "use strict";

  window.__BRAND__ = {
    name: "Maison Suzi",
    tagline: "Horneado con pasión",

    contact: {
      whatsappDisplay: "+34 695 82 38 78",
      whatsappLink: "https://wa.me/34695823878",
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
        icon: "cheesecake",
        photo: "assets/img/cheesecake.webp"
      },
      {
        id: "naked-frutos",
        category: "tartas",
        name: "Naked cake de frutos rojos",
        desc: "Capas ligeras, crema suave y un jardín de frutas de temporada.",
        icon: "layer-cake",
        photo: "assets/img/naked-cake.webp"
      },
      {
        id: "eclair",
        category: "individuales",
        name: "Eclair de frutos rojos",
        desc: "Choux relleno de crema, glaseado brillante y fruta fresca.",
        icon: "eclair",
        photo: "assets/img/eclair.webp"
      },
      {
        id: "tartaletas",
        category: "individuales",
        name: "Tartaletas de fruta de temporada",
        desc: "Base crujiente, crema pastelera y fruta fresca — a elegir sabor.",
        icon: "cup",
        photo: "assets/img/tartaletas.webp"
      },
      {
        id: "tiramisu",
        category: "individuales",
        name: "Tiramisú clásico en vasito",
        desc: "Receta tradicional italiana, cacao amargo y un toque de café.",
        icon: "tiramisu",
        photo: "assets/img/tiramisu.webp"
      },
      {
        id: "vasito-frambuesa",
        category: "individuales",
        name: "Vasito de cheesecake y frambuesa",
        desc: "Base de galleta, cheesecake cremoso y coulis de frambuesa casero.",
        icon: "cup",
        photo: "assets/img/vasito-frambuesa.webp"
      },
      {
        id: "cumpleanos",
        category: "cumple",
        name: "Pastel de cumpleaños a medida",
        desc: "Diseñado contigo: rellenos, colores y decoración para tu ocasión.",
        icon: "birthday",
        photo: "assets/img/birthday-cake.webp"
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
