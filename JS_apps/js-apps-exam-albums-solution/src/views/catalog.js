import { html, nothing } from "../lib.js";
import { getAll } from "../service/catalogService.js";

function catalogTemplate(data) {
  return html`
    <section id="dashboard">
      <h2>Albums</h2>
      ${data.length > 0
        ? html`
            <ul class="card-wrapper">
              <!-- Display a li with information about every post (if any)-->
              ${data.map(dataCard)}
            </ul>
          `
        : html` <h2>There are no albums added yet.</h2> `}

      <!-- Display an h2 if there are no posts -->
    </section>
  `;
}

export async function catalogView(ctx) {
  const data = await getAll();
  ctx.render(catalogTemplate(data));
}

function dataCard({ singer, album, imageUrl, _id, sales }) {
  return html`
    <li class="card">
      <img src="${imageUrl}" alt="travis" />
      <p><strong>Singer/Band: </strong><span class="singer">${singer}</span></p>
      <p><strong>Album name: </strong><span class="album">${album}</span></p>
      <p><strong>Sales:</strong><span class="sales">${sales}</span></p>
      <a class="details-btn" href="${`/details/${_id}`}">Details</a>
    </li>
  `;
}
