(function () {
  "use strict";

  window.__BRAND__ = {
    name: "Acacia Dorada",
    tagline: "Oro líquido, cosechado a mano.",

    contact: {
      whatsapp: "34600000000",
      whatsappDisplay: "+34 600 00 00 00",
      email: "hola@acaciadorada.es",
      hours: "Lun–Vie, 9:00–18:00",
      location: "Sierra de Gredos, Ávila"
    },

    /* Los precios y datos viven también en el HTML (data-*) para que la
       página funcione sin JavaScript. Esto es la copia de referencia. */
    products: [
      { id: "p-acacia",  name: "Acacia",           price: 11.50 },
      { id: "p-lavanda", name: "Lavanda",          price: 14.90 },
      { id: "p-bosque",  name: "Bosque",           price: 13.50 },
      { id: "p-panal",   name: "Panal virgen",     price: 16.90 }
    ]
  };
})();
