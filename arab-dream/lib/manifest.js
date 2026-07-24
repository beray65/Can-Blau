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
      email: "arabdream.ny@gmail.com"
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

    // La carta real vive en tools/menu-data.mjs y se genera dentro de
    // index.html con `node tools/generate-carta.mjs` (ver HANDOFF.md).

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
