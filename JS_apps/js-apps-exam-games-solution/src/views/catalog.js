import { html, nothing } from "../lib.js";
import { getAll } from "../service/catalogService.js";

function catalogTemplate(data) {
  return html`
    <section id="catalog-page">
      <h1>All Games</h1>
      <!-- Display div: with information about every game (if any) -->
      ${data.length>0 ? (
        data.map(dataCard)
      ) : (
        html `<h3 class="no-articles">No articles yet</h3>`
      )}

      <!-- Display paragraph: If there is no games  -->
    </section>
  `;
}

export async function catalogView(ctx) {
  const data = await getAll();
  ctx.render(catalogTemplate(data));
}

function dataCard({ title, imageUrl, _id, category }) {
  return html`
    <div class="allGames">
      <div class="allGames-info">
        <img src="${imageUrl}" />
        <h6>${category}</h6>
        <h2>${title}</h2>
        <a href="${`/details/${_id}`}" class="details-button">Details</a>
      </div>
    </div>
  `;
}
