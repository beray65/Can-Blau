// Genera el HTML de la sección #carta a partir de tools/menu-data.mjs
// y lo inyecta en index.html entre los marcadores CARTA:START / CARTA:END.
//
// Uso: node tools/generate-carta.mjs

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { menu } from "./menu-data.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const indexPath = join(__dirname, "..", "index.html");

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

function renderItem([name, price]) {
  return `            <li class="menu-row"><span class="menu-name">${esc(name)}</span><span class="menu-price">${esc(price)}&nbsp;€</span></li>\n`;
}

function renderSubcat(group, subcat, isFirst) {
  const active = isFirst ? " is-active" : "";
  let html = `          <div class="carta-sub-panel${active}" data-subcat-panel="${subcat.id}" data-group="${group.id}">\n`;
  html += `            <ul class="menu-list">\n`;
  html += subcat.items.map(renderItem).join("");
  html += `            </ul>\n`;
  if (subcat.note) {
    html += `            <p class="menu-note">${esc(subcat.note)}</p>\n`;
  }
  html += `          </div>\n`;
  return html;
}

function renderGroup(group, isFirst) {
  const activeGroup = isFirst ? " is-active" : "";
  let html = `      <div class="carta-group-panel${activeGroup}" data-group-panel="${group.id}">\n`;

  if (group.subcats.length > 1) {
    html += `        <div class="carta-subcats" data-subcats role="tablist" aria-label="Subcategorías de ${esc(group.label)}">\n`;
    html += group.subcats.map((s, i) => `          <button type="button" class="carta-subcat${i === 0 ? " is-active" : ""}" data-subcat="${s.id}" role="tab" aria-selected="${i === 0}">${esc(s.label)}</button>\n`).join("");
    html += `        </div>\n`;
  }

  html += `        <div class="carta-sub-panels">\n`;
  html += group.subcats.map((s, i) => renderSubcat(group, s, i === 0)).join("");
  html += `        </div>\n`;
  html += `      </div>\n`;
  return html;
}

function renderGroupTabs() {
  let html = `      <div class="carta-groups" data-carta-groups role="tablist" aria-label="Categorías de la carta">\n`;
  html += menu.map((g, i) => `        <button type="button" class="carta-group${i === 0 ? " is-active" : ""}" data-group="${g.id}" role="tab" aria-selected="${i === 0}"><img src="${esc(g.icon)}" alt="" aria-hidden="true">${esc(g.label)}</button>\n`).join("");
  html += `      </div>\n`;
  return html;
}

let block = "<!-- CARTA:START -->\n";
block += renderGroupTabs();
block += `      <div class="carta-panels">\n`;
block += menu.map((g, i) => renderGroup(g, i === 0)).join("");
block += `      </div>\n`;
block += "      <!-- CARTA:END -->";

const html = readFileSync(indexPath, "utf8");
const re = /<!-- CARTA:START -->[\s\S]*?<!-- CARTA:END -->/;
if (!re.test(html)) {
  console.error("No se encontraron los marcadores CARTA:START / CARTA:END en index.html");
  process.exit(1);
}
const next = html.replace(re, block);
writeFileSync(indexPath, next, "utf8");

const itemCount = menu.reduce((acc, g) => acc + g.subcats.reduce((a, s) => a + s.items.length, 0), 0);
console.log(`Carta generada: ${menu.length} categorías, ${itemCount} platos/bebidas.`);
