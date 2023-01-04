import { html } from "../library.js";
import { getAll } from "../services/dataService.js";

export async function dashboardTemplate(ctx) {
  const data = await getAll();
  ctx.render(dashboardView(data));
}

function dashboardView(data) {
  if (data.length > 0) {
    return html`
      <section id="dashboard">
        <h2>Collectibles</h2>
        <ul class="card-wrapper">
        ${
          data.map(card)
        }
        </ul>
      </section>
    `;
  } else {
    return html`<h2>There are no items added yet.</h2> `;
  }
}

export function card({brand, model, imageUrl, value, _id}) {
  return html`
      <li class="card">
      <img src="${imageUrl}" alt="eminem" />
      <p><strong>Brand: </strong><span class="brand">${brand}</span></p>
      <p>
        <strong>Model: </strong
        ><span class="model">${model}</span>
      </p>
      <p><strong>Value:</strong><span class="value">${value}</span>$</p>
      <a class="details-btn" href="/catalog/${_id}">Details</a>
    </li>
  `
}