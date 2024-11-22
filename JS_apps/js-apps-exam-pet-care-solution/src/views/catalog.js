import { html, nothing } from "../lib.js";
import { getAll } from "../service/catalogService.js";

function catalogTemplate(data) {
  return html`
    <section id="dashboard">
      <h2 class="dashboard-title">Services for every animal</h2>
      <div class="animals-dashboard">
        ${data.length > 0 ? data.map(dataCard) : nothing}
        <!--If there is no pets in dashboard-->
        ${data.length == 0 ? 
          html `<div>
            <p class="no-pets">No pets in dashboard</p>
          </div>`
         : 
          nothing
        }
      </div>
    </section>
  `;
}

export async function catalogView(ctx) {
  const data = await getAll();
  ctx.render(catalogTemplate(data));
}

function dataCard({ name, image, _id, breed }) {
  return html`
    <div class="animals-board">
      <article class="service-img">
        <img class="animal-image-cover" src="${image}" />
      </article>
      <h2 class="name">${name}</h2>
      <h3 class="breed">${breed}</h3>
      <div class="action">
        <a class="btn" href="${`/details/${_id}`}">Details</a>
      </div>
    </div>
  `;
}
