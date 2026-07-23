// Fuente de la carta real de Arab Dream Palma.
// Edita aquí precios/platos y vuelve a correr `node tools/generate-carta.mjs`
// para regenerar el bloque de la carta dentro de index.html.

export const menu = [
  {
    id: "comida",
    label: "Comida",
    icon: "assets/img/icon-tagine.svg",
    subcats: [
      {
        id: "tacos",
        label: "Tacos & Wraps",
        items: [
          ["Pollo", "7"],
          ["Kefta", "7,50"],
          ["Mixto (Pollo + Kefta)", "7,50"],
          ["Gambas", "8,50"],
          ["Calamares", "8,50"],
          ["Mixto (Gambas + Calamares)", "8,50"],
          ["Mixto (Gambas + Pollo)", "8,50"],
          ["Falafel garbanzos", "8"],
          ["Falafel espinacas + almendras", "8"],
          ["Falafel pimientos", "8"],
          ["Falafel mixto", "8"],
          ["Falafel espinacas y piñones", "9"],
          ["Atún", "6,50"]
        ]
      },
      {
        id: "sopas",
        label: "Sopas",
        items: [
          ["Harira marroquí", "4"],
          ["Harira completa (con huevo y chebakia)", "6"],
          ["Sopa de marisco", "7"],
          ["Sopa de calabaza", "5"]
        ]
      },
      {
        id: "hamburguesas",
        label: "Hamburguesas",
        items: [
          ["Pollo", "8,50"],
          ["Kefta", "8,50"],
          ["Doble pollo", "12"],
          ["Doble kefta", "12"],
          ["Falafel de garbanzo", "7,50"],
          ["Falafel espinacas", "8,50"],
          ["Falafel pimiento", "8,50"]
        ]
      },
      {
        id: "cuscus",
        label: "Cuscús",
        items: [
          ["Pollo", "8,50"],
          ["Ternera", "10"],
          ["Cordero", "12"],
          ["Vegetal", "6,50"],
          ["Saykok", "5"],
          ["Safa", "10"]
        ]
      },
      {
        id: "tajin",
        label: "Tajín",
        items: [
          ["Pollo", "8"],
          ["Ternera", "9,50"],
          ["Cordero con verduras", "13"],
          ["Verdura", "6,50"],
          ["Berenjena rellena de kefta", "6,50"],
          ["Kefta", "8"],
          ["Gambas", "14"],
          ["Gambas y calamares", "13,50"],
          ["Alubias", "6"],
          ["Lentejas", "6"],
          ["Baisara", "6"]
        ]
      },
      {
        id: "platos",
        label: "Platos",
        items: [
          ["Falafel garbanzo con arroz y ensalada", "9,50"],
          ["Falafel espinacas con arroz y ensalada", "10,50"],
          ["Falafel pimiento con arroz y ensalada", "10,50"],
          ["Arroz con pollo", "12"],
          ["Arroz con ternera", "13"],
          ["Zaalok", "4"],
          ["Arroz solo", "4"],
          ["Ensalada pequeña", "6"],
          ["Ensalada grande", "10"]
        ]
      }
    ]
  },
  {
    id: "bebidas",
    label: "Bebidas",
    icon: "assets/img/icon-tea.svg",
    subcats: [
      {
        id: "frias",
        label: "Bebidas frías",
        items: [
          ["Coca-Cola", "2"],
          ["Coca-Cola Zero", "2"],
          ["Fanta Naranja", "2"],
          ["Fanta Limón", "2"],
          ["Aquarius Naranja", "2"],
          ["Aquarius Limón", "2"],
          ["Red Bull", "2,20"],
          ["Hawai", "2"],
          ["Poms", "2"],
          ["Sprite", "2"],
          ["Tónica", "2"],
          ["Nestea", "2"],
          ["ColaCao", "2"]
        ]
      },
      {
        id: "zumos",
        label: "Zumos",
        items: [
          ["Naranja", "1,80"],
          ["Melocotón", "1,80"],
          ["Piña", "1,80"],
          ["Multifruta", "2"],
          ["Manzana", "1,80"],
          ["Bio Fruta", "1,80"],
          ["Naranja natural", "3,50"]
        ]
      },
      {
        id: "batidos",
        label: "Batidos",
        items: [
          ["Aguacate", "5"],
          ["Aguacate y frutos secos", "5,50"],
          ["Fruta con leche", "4"],
          ["Fruta con naranja", "4,50"],
          ["Almendras con leche", "5"],
          ["Plátano con leche", "4"],
          ["Naranja y fresa", "5,50"],
          ["Naranja con mango", "5,50"]
        ]
      },
      {
        id: "tes",
        label: "Tés e infusiones",
        items: [
          ["Marroquí", "1,50"],
          ["Rojo (caramelo belga)", "1,80"],
          ["Las amigas de la cúrcuma", "1,80"],
          ["Infusión de mango", "1,80"],
          ["Té de jengibre y limón", "1,80"],
          ["Infusión de piña colada", "1,80"],
          ["Infusión relajante", "1,80"],
          ["Poleo menta", "1,80"],
          ["Manzanilla", "1,50"],
          ["Rojo (Pu-erh)", "1,80"],
          ["Blanco (piel de melocotón)", "1,80"],
          ["Azul (oolong)", "1,80"],
          ["Negro (turco)", "1,80"],
          ["Frutos del bosque", "1,80"],
          ["Roibos (chai y áfrica)", "1,80"],
          ["Negro (inglés)", "1,80"]
        ]
      },
      {
        id: "cafes",
        label: "Cafés",
        items: [
          ["Americano", "1,60"],
          ["Cortado", "1,40"],
          ["Descafeinado", "1,60"],
          ["Cappuccino", "2,20"],
          ["Café solo", "1,30"],
          ["Café con leche", "1,60"],
          ["Leche", "1,60"],
          ["ColaCao", "2"]
        ],
        note: "Suplemento leche de soja, sin lactosa o de avena: +0,10 €"
      }
    ]
  },
  {
    id: "dulces",
    label: "Dulces",
    icon: "assets/img/icon-sweets.svg",
    subcats: [
      {
        id: "dulces-caseros",
        label: "Dulces caseros",
        items: [
          ["Sakya", "1,50"],
          ["Kahk", "1,50"],
          ["Galleta caramel", "1,20"],
          ["Galleta de chocolate", "1,20"],
          ["Galleta mermelada", "1,20"],
          ["Galleta khalit", "1,30"],
          ["Halwa (kilo)", "1,20"],
          ["Chebakia", "1"],
          ["Caab chocolate", "1,50"],
          ["Kikis watani", "0,80"],
          ["Miloja", "1,30"],
          ["Pasta de dátil", "1,20"],
          ["Dátil con nueces", "1,20"],
          ["Grebia", "1,20"],
          ["Polvorones", "1,20"],
          ["Chebakia (1 kg)", "25"],
          ["Bochneja (1 kg)", "20"],
          ["Mekrot (1 kg)", "20"],
          ["Sfof (100 g)", "3"],
          ["Polo Oreo", "2,50"],
          ["Baklawa", "1,50"],
          ["Bolita de coco", "1,10"],
          ["Bolita María", "1,10"],
          ["Bolita de almendras", "1,50"],
          ["Bombón", "1,50"],
          ["Briwat de almendras", "1,50"],
          ["Briwat de anacardo", "1,60"],
          ["Briwat de pistachos", "1,60"],
          ["Briwat de cacahuete", "1,30"],
          ["Cinta de almendras", "1,50"],
          ["Cinta de cacahuete", "1,30"],
          ["Cono helado", "2"],
          ["Cuerno choco", "1,50"],
          ["Kgab, pasta de almendras", "1,50"],
          ["Fakas", "1,20"],
          ["Haram", "1,60"],
          ["Mluza de almendras", "1,50"],
          ["Mluza de nueces", "1,60"],
          ["Mluza de coco", "1,40"],
          ["Nido de pistacho", "1,50"],
          ["Nido de frutos secos", "1,40"],
          ["Noga de almendra", "1,40"],
          ["Rolitos de almendras con avellanas", "1,50"],
          ["Rolitos de almendras, nueces y pasas", "1,60"],
          ["Tartajea de frutos secos", "1,50"],
          ["Twisat de almendras", "1,50"],
          ["Twisat de frutos secos", "1,60"]
        ]
      }
    ]
  },
  {
    id: "salados",
    label: "Salados",
    icon: "assets/img/icon-mezze.svg",
    subcats: [
      {
        id: "salados",
        label: "Salados",
        items: [
          ["Pastilla de pollo", "3,30"],
          ["Pastilla de marisco", "3,50"],
          ["Briwat de pollo", "3"],
          ["Briwat de marisco", "3,50"],
          ["Rolitos de queso", "1,50"],
          ["Rolitos de espinacas con piñones", "2,50"],
          ["Kich de pollo", "2,50"],
          ["Kich de kefta", "2,80"],
          ["Lumpia", "2,50"],
          ["Croquetas de pollo", "1,20"],
          ["Empanadas de atún", "2"],
          ["Rolitos de kefta con verduras", "2,50"],
          ["Rolitos de pollo con verduras", "2,50"],
          ["Rolitos de arroz", "1,50"],
          ["Briwat de queso", "1,50"],
          ["Rghifa rellena de pollo", "3"],
          ["Rghifa rellena de kefta", "3"],
          ["Mjebna", "1,50"],
          ["Briwat de pollo con bechamel", "1,50"],
          ["Pistola de gambas con bechamel", "2"],
          ["Corno de gambas con bechamel", "2"]
        ]
      }
    ]
  }
];
