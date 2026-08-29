// ============================================================
// Efecto de la tarjeta del hero: al sacar el mouse de encima,
// se arma una grilla de "píxeles" que se prenden y apagan en
// diagonal, con un pequeño pulso de escala en la tarjeta.
// Es una recreación en JS/CSS puro (sin librerías) de la
// animación original, que usaba GSAP.
// ============================================================

function triggerHeroPixelDissolve(card, grid) {
  const gridSize = 4;
  const pixelSize = 100 / gridSize;
  grid.innerHTML = "";

  const totalPixels = gridSize * gridSize;
  const clearIndices = new Set();
  while (clearIndices.size < 3) {
    clearIndices.add(Math.floor(Math.random() * totalPixels));
  }

  const pixels = [];
  let pixelIndex = 0;
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (clearIndices.has(pixelIndex)) {
        pixelIndex++;
        continue;
      }

      const pixel = document.createElement("div");
      const isAccent = Math.random() < 0.5;
      const normalizedPosition = (col + (gridSize - 1 - row)) / ((gridSize - 1) * 2);
      const targetOpacity = 0.5 + normalizedPosition * 0.5;

      pixel.className = `hero-pixel ${isAccent ? "is-accent" : "is-black"}`;
      pixel.style.width = `${pixelSize}%`;
      pixel.style.height = `${pixelSize}%`;
      pixel.style.left = `${col * pixelSize}%`;
      pixel.style.top = `${row * pixelSize}%`;

      grid.appendChild(pixel);
      pixels.push({ el: pixel, targetOpacity });
      pixelIndex++;
    }
  }

  if (!pixels.length) return;

  const revealDuration = 450;
  const order = pixels.map((_, i) => i).sort(() => Math.random() - 0.5);
  const stepDelay = revealDuration / pixels.length;

  card.style.transition = "transform 0.2s ease-in";
  card.style.transform = "scale(0.995)";

  order.forEach((pixelPos, i) => {
    const { el, targetOpacity } = pixels[pixelPos];
    setTimeout(() => {
      el.style.opacity = String(targetOpacity);
    }, i * stepDelay);
  });

  const holdUntil = revealDuration * 2;
  setTimeout(() => {
    pixels.forEach(({ el }) => {
      el.classList.add("is-out");
      el.style.opacity = "0";
    });
    card.style.transition = "transform 0.3s ease-in";
    card.style.transform = "";
  }, holdUntil);

  setTimeout(() => {
    grid.innerHTML = "";
    card.style.transition = "";
  }, holdUntil + 300);
}

function setupHeroInteraction() {
  const card = document.getElementById("hero-card");
  const grid = document.getElementById("hero-pixel-grid");
  if (!card || !grid) return;
  card.addEventListener("mouseleave", () => triggerHeroPixelDissolve(card, grid));
}

document.addEventListener("DOMContentLoaded", setupHeroInteraction);
