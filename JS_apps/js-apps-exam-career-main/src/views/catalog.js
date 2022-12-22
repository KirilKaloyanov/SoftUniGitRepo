import { html, nothing } from "../lib.js";
import { getAll } from "../service/catalogService.js";

function catalogTemplate(data) {
  return html`
    <section id="dashboard">
      <h2>Job Offers</h2>

      ${data.length > 0 ? data.map(dataCard) : nothing}
      ${data.length == 0 ? html`<h2>No offers yet.</h2>` : nothing}
    </section>
  `;
}

export async function catalogView(ctx) {
  const data = await getAll();
  ctx.render(catalogTemplate(data));
}

function dataCard({ title, imageUrl, _id, salary }) {
  return html`
    <div class="offer">
      <img src="${imageUrl}" alt="./images/example3.png" />
      <p><strong>Title: </strong><span class="title">${title}</span></p>
      <p><strong>Salary:</strong><span class="salary">${salary}</span></p>
      <a class="details-btn" href="/details/${_id}">Details</a>
    </div>
  `;
}
