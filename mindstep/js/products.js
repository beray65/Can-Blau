// ============================================================
// CATÁLOGO DE PRODUCTOS
//
// Actualizado con tu modelo real: Nike Mind, en 3 colores.
// Precio real: 55€. Los talles son PLACEHOLDER (marcados abajo) —
// pásame los reales y los cambio en un toque.
//
// Para agregar/editar un producto, copia un bloque { ... } y
// completa sus campos:
//
//   name       -> nombre del modelo, ej: "Nike Mind"
//   color      -> color / detalle, ej: "Negro"
//   price      -> precio en números, sin puntos ni símbolo, ej: 55
//   sizes      -> talles disponibles, ej: [38, 39, 40, 41]
//   condition  -> "nuevo" o "poco-uso"
//   images     -> lista de rutas a fotos reales, ej:
//                 ["assets/productos/nike-mind-negro-1.jpg",
//                  "assets/productos/nike-mind-negro-2.jpg"]
//                 Puedes poner 1 o varias (se muestran puntitos
//                 para pasar de una a otra). Si dejas [], se
//                 muestra un ícono de muestra en su lugar.
//   accent     -> número del 0 al 3, solo cambia el color de
//                 fondo del ícono de muestra (no importa si
//                 ya tienes fotos reales cargadas).
//   paymentUrl -> link de pago online (opcional). Si lo dejas
//                 vacío ("") no aparece el botón de pago y solo
//                 se ve "Consultar" por WhatsApp, como ahora.
//
//                 Para conseguir el link (gratis, sin programar):
//                 entra a dashboard.stripe.com (o su equivalente
//                 de PayPal), creas una cuenta, y en la sección
//                 "Payment Links" generas un link con el precio
//                 exacto de este producto. Pega esa URL aquí.
// ============================================================
const PRODUCTS = [
  {
    id: 1,
    name: "Nike Mind",
    color: "Negro",
    price: 55,
    sizes: [38, 39, 40, 41, 42, 43, 44, 45], // TODO: talles reales
    condition: "nuevo",
    images: ["assets/productos/nike-mind-negro-catalogo.jpg"],
    accent: 0,
    paymentUrl: "",
  },
  {
    id: 2,
    name: "Nike Mind",
    color: "Gris",
    price: 55,
    sizes: [38, 39, 40, 41, 42, 43, 44, 45], // TODO: talles reales
    condition: "nuevo",
    images: ["assets/productos/nike-mind-gris-catalogo.jpg"],
    accent: 2,
    paymentUrl: "",
  },
  {
    id: 3,
    name: "Nike Mind",
    color: "Rojo",
    price: 55,
    sizes: [38, 39, 40, 41, 42, 43, 44, 45], // TODO: talles reales
    condition: "nuevo",
    images: ["assets/productos/nike-mind-rojo-catalogo.jpg"],
    accent: 1,
    paymentUrl: "",
  },
];
