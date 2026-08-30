// ============================================================
// VALORACIONES DE CLIENTES
//
// Todavía no hay ninguna cargada, así que la sección muestra un
// estado vacío honesto en vez de inventar reseñas falsas. Cuando
// tengas una valoración real (por WhatsApp, Instagram, etc.),
// agrégala aquí como un bloque { ... }:
//
//   name   -> nombre del cliente, ej: "Juan P."
//   rating -> de 1 a 5
//   text   -> el comentario, sin comillas
//
// Ejemplo:
//   { name: "Juan P.", rating: 5, text: "Todo perfecto, llegó rápido y como se veía en las fotos." }
// ============================================================
const REVIEWS = [];

function starsHTML(rating) {
  return Array.from({ length: 5 })
    .map((_, i) => `<span class="star${i < rating ? " is-filled" : ""}">★</span>`)
    .join("");
}

function reviewCardHTML(review) {
  return `
    <article class="review-card">
      <div class="review-stars">${starsHTML(review.rating)}</div>
      <p class="review-text">"${review.text}"</p>
      <p class="review-name">${review.name}</p>
    </article>
  `;
}

function renderReviews() {
  const grid = document.getElementById("reviews-grid");
  if (!grid) return;

  if (!REVIEWS.length) {
    grid.innerHTML = `
      <div class="reviews-empty">
        <p>Todavía no tenemos valoraciones publicadas. ¡Sé el primero en dejar la tuya!</p>
        <a class="btn btn-outline" target="_blank" rel="noopener" href="${buildWhatsAppLink(genericMessage())}">
          Dejar una valoración
        </a>
      </div>
    `;
    return;
  }
  grid.innerHTML = REVIEWS.map(reviewCardHTML).join("");
}

document.addEventListener("DOMContentLoaded", renderReviews);
