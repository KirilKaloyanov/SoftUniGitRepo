import { html, nothing } from "../library.js";
import { getById } from "../services/dataService.js";

export async function detailsTemplate(ctx) {
  const user = ctx.user() || '';
  const id = ctx.params.id;
  const item = await getById(id);
  ctx.render(detailsView(user, item));
}

function detailsView(
  user,
  { brand, model, imageUrl, value, _ownerId, release, designer, _id }
) {
  return html`
    <section id="details">
          <div id="details-wrapper">
            <p id="details-title">Shoe Details</p>
            <div id="img-wrapper">
              <img src="${imageUrl}" alt="example1" />
            </div>
            <div id="info-wrapper">
              <p>Brand: <span id="details-brand">${brand}</span></p>
              <p>
                Model: <span id="details-model">${model}</span>
              </p>
              <p>Release date: <span id="details-release">${release}</span></p>
              <p>Designer: <span id="details-designer">${designer}</span></p>
              <p>Value: <span id="details-value">${value}</span></p>
            </div>

            <!--Edit and Delete are only for creator-->
            ${
              _ownerId == user._id
                ? html`
                    <div id="action-buttons">
                      <a href="${`/edit/${_id}`}" id="edit-btn">Edit</a>
                      <a href="${`/delete/${_id}`}" id="delete-btn">Delete</a>
                    </div>
                  `
                : nothing
            }
            </div>
          </div>
        </section>
    `;
}
