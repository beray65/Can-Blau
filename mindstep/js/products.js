// ============================================================
// CATÁLOGO DE PRODUCTOS
//
// Actualizado con tu modelo real: Nike Mind, en 3 colores.
// Los precios y talles son PLACEHOLDER (marcados abajo) — pasame
// los reales y los cambio en un toque.
//
// Para agregar/editar un producto, copiá un bloque { ... } y
// completá sus campos:
//
//   name       -> nombre del modelo, ej: "Nike Mind"
//   color      -> color / detalle, ej: "Negro"
//   price      -> precio en números, sin puntos ni "$", ej: 15000
//   sizes      -> talles disponibles, ej: [38, 39, 40, 41]
//   condition  -> "nuevo" o "poco-uso"
//   images     -> lista de rutas a fotos reales, ej:
//                 ["assets/productos/nike-mind-negro-1.jpg",
//                  "assets/productos/nike-mind-negro-2.jpg"]
//                 Podés poner 1 o varias (se muestran puntitos
//                 para pasar de una a otra). Si dejás [], se
//                 muestra un ícono de muestra en su lugar.
//   accent     -> número del 0 al 3, solo cambia el color de
//                 fondo del ícono de muestra (no importa si
//                 ya tenés fotos reales cargadas).
// ============================================================
const PRODUCTS = [
  {
    id: 1,
    name: "Nike Mind",
    color: "Negro",
    price: 15000, // TODO: precio real
    sizes: [38, 39, 40, 41, 42, 43, 44, 45], // TODO: talles reales
    condition: "nuevo",
    images: [
      "assets/productos/nike-mind-negro-1.jpg",
      "assets/productos/nike-mind-negro-2.jpg",
    ],
    accent: 0,
  },
  {
    id: 2,
    name: "Nike Mind",
    color: "Gris",
    price: 15000, // TODO: precio real
    sizes: [38, 39, 40, 41, 42, 43, 44, 45], // TODO: talles reales
    condition: "nuevo",
    images: [
      "assets/productos/nike-mind-gris-1.jpg",
      "assets/productos/nike-mind-gris-2.jpg",
      "assets/productos/nike-mind-gris-3.jpg",
    ],
    accent: 2,
  },
  {
    id: 3,
    name: "Nike Mind",
    color: "Rojo",
    price: 15000, // TODO: precio real
    sizes: [38, 39, 40, 41, 42, 43, 44, 45], // TODO: talles reales
    condition: "nuevo",
    images: ["assets/productos/nike-mind-rojo-1.jpg"],
    accent: 1,
  },
];
