(function () {
  "use strict";

  window.__BRAND__ = {
    name: "Arab Dream",
    place: "Palma",
    fullName: "Arab Dream Palma",
    kicker: "Gastronomía marroquí · Palma de Mallorca",
    tagline: "Especias que abrazan. Pan que se comparte.",

    contact: {
      address: "C. de Manacor, 17, Llevant, 07006 Palma, Illes Balears",
      addressShort: "C. de Manacor, 17 · Llevant, Palma",
      phoneDisplay: "871 85 55 20",
      phoneTel: "+34871855520",
      whatsapp: "34871855520",
      whatsappMessage: "Hola Arab Dream, me gustaría reservar mesa para ",
      mapsQuery: "Arab Dream Palma, Carrer de Manacor 17, 07006 Palma",
      mapsEmbedSrc: "https://www.google.com/maps?q=" + encodeURIComponent("Arab Dream Palma, Carrer de Manacor 17, 07006 Palma") + "&output=embed",
      mapsLink: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Arab Dream Palma, Carrer de Manacor 17, 07006 Palma"),
      instagram: "#",
      facebook: "#",
      email: "hola@arabdreampalma.es"
    },

    rating: { value: 4.6, count: 367 },

    // 0 = domingo ... 6 = sábado (formato Date.getDay())
    hours: {
      openDays: [1, 2, 3, 4, 5, 6],
      open: "09:00",
      close: "22:00",
      display: [
        { label: "Lunes – Sábado", value: "9:00 – 22:00" },
        { label: "Domingo", value: "Cerrado" }
      ]
    },

    menu: {
      note: "Selección orientativa de la casa. Carta y precios sujetos a confirmación por el restaurante.",
      categories: [
        {
          id: "entrantes",
          label: "Entrantes",
          icon: "assets/img/icon-mezze.svg",
          items: [
            { name: "Hummus casero", desc: "Garbanzos, tahini y aceite de oliva virgen", price: 6 },
            { name: "Baba ganoush", desc: "Berenjena ahumada, ajo y limón", price: 6 },
            { name: "Falafel", desc: "Seis piezas, salsa de yogur y hierbas", price: 7 },
            { name: "Berenjenas rellenas", desc: "Especiadas, al estilo de la casa", price: 8 },
            { name: "Harira", desc: "Sopa tradicional de lentejas y garbanzos", price: 6 }
          ]
        },
        {
          id: "tajines",
          label: "Tajines",
          icon: "assets/img/icon-tagine.svg",
          items: [
            { name: "Tajine de pollo", desc: "Limón confitado, aceitunas y especias", price: 14 },
            { name: "Tajine de cordero", desc: "Ciruelas pasas, almendra tostada y canela", price: 16 },
            { name: "Tajine de osobuco", desc: "Cocción lenta, verduras de temporada", price: 16 },
            { name: "Tajine de verduras", desc: "Selección de temporada, cuscús aparte", price: 12 }
          ]
        },
        {
          id: "cuscus",
          label: "Cuscús",
          icon: "assets/img/icon-couscous.svg",
          items: [
            { name: "Cuscús real", desc: "Pollo, cordero, verduras y garbanzos", price: 15 },
            { name: "Cuscús con kefta", desc: "Albóndigas especiadas, salsa de tomate", price: 13 },
            { name: "Cuscús de verduras", desc: "Siete verduras de temporada", price: 11 }
          ]
        },
        {
          id: "parrilla",
          label: "Parrilla",
          icon: "assets/img/icon-skewer.svg",
          items: [
            { name: "Brochetas mixtas", desc: "Cordero, pollo y ternera a la brasa", price: 14 },
            { name: "Kefta a la brasa", desc: "Carne especiada, comino y perejil", price: 12 },
            { name: "Pollo a la brasa", desc: "Marinado con especias marroquíes", price: 13 },
            { name: "Tacos árabes de pollo", desc: "Pan casero, verduras y salsas de la casa", price: 9 }
          ]
        },
        {
          id: "dulces",
          label: "Dulces",
          icon: "assets/img/icon-sweets.svg",
          items: [
            { name: "Pastela dulce", desc: "Hojaldre, almendra y canela", price: 6 },
            { name: "Cuernos de gacela", desc: "Pasta de almendra, agua de azahar", price: 5 },
            { name: "Baklava surtido", desc: "Selección de la casa, miel y pistacho", price: 6 },
            { name: "Pasteles árabes", desc: "Variedad diaria de repostería", price: 6 }
          ]
        },
        {
          id: "te",
          label: "Té y café",
          icon: "assets/img/icon-tea.svg",
          items: [
            { name: "Té moruno a la menta", desc: "Servido a la manera tradicional", price: 3 },
            { name: "Café árabe con cardamomo", desc: "Tueste especiado", price: 3 },
            { name: "Zumo natural del día", desc: "Fruta fresca de temporada", price: 4 }
          ]
        }
      ]
    },

    testimonials: [
      {
        quote: "Comimos con un amigo de Marruecos y tomamos té y postres. Probamos varios platos como lentejas, osobuco, falafel y tacos con pan árabe. ¡Todo muy rico! Y la decoración muy bonita.",
        author: "Aba M.",
        source: "Reseña de Google"
      },
      {
        quote: "Este restaurante marroquí recientemente inaugurado en la calle Manacor sorprende por su sabor y su ambiente cuidado.",
        author: "Irlanda M.",
        source: "Reseña de Google · Local Guide"
      },
      {
        quote: "La comida estaba muy buena. El local estaba limpio y el servicio era bueno. Sin duda volveré a comer allí.",
        author: "Kati K.",
        source: "Reseña de Google"
      }
    ]
  };
})();
