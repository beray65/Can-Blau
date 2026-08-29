// ============================================================
// CATÁLOGO DE PRODUCTOS — esto es lo primero que vas a querer
// cambiar. Son datos de EJEMPLO para que veas cómo luce el sitio.
//
// Para agregar/editar un producto, copiá un bloque { ... } y
// completá sus campos:
//
//   name       -> nombre del modelo, ej: "Nike Victori One Slide"
//   color      -> color / detalle, ej: "Negro / Blanco"
//   price      -> precio en números, sin puntos ni "$", ej: 15000
//   sizes      -> talles disponibles, ej: [38, 39, 40, 41]
//   condition  -> "nuevo" o "poco-uso"
//   image      -> (opcional) ruta a una foto real, ej:
//                 "assets/productos/victori-one-negro.jpg"
//                 Si no ponés "image", se muestra un ícono de
//                 muestra en su lugar.
//   accent     -> número del 0 al 3, solo cambia el color de
//                 fondo del ícono de muestra (no importa si
//                 usás foto real).
// ============================================================
const PRODUCTS = [
  {
    id: 1,
    name: "Nike Victori One Slide",
    color: "Negro / Blanco",
    price: 15000,
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    condition: "nuevo",
    image: "",
    accent: 0,
  },
  {
    id: 2,
    name: "Nike Benassi JDI",
    color: "Negro",
    price: 18000,
    sizes: [37, 38, 39, 40, 41, 42, 43, 44],
    condition: "nuevo",
    image: "",
    accent: 1,
  },
  {
    id: 3,
    name: "Nike Off-Court Slide",
    color: "Gris / Volt",
    price: 16500,
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    condition: "nuevo",
    image: "",
    accent: 2,
  },
  {
    id: 4,
    name: "Nike Kawa Shower Slide",
    color: "Azul / Blanco",
    price: 14000,
    sizes: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
    condition: "poco-uso",
    image: "",
    accent: 3,
  },
  {
    id: 5,
    name: "Nike Victori One Slide",
    color: "University Red",
    price: 15000,
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    condition: "nuevo",
    image: "",
    accent: 0,
  },
  {
    id: 6,
    name: "Nike Sunray Adjust 6",
    color: "Negro (con velcro)",
    price: 17000,
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44],
    condition: "nuevo",
    image: "",
    accent: 1,
  },
];
