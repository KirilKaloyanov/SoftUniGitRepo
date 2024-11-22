import { html, nothing } from "../lib.js";
import { getById } from "../service/catalogService.js";
import {
  getApplications,
  getApplicationsCount,
} from "../service/applicationService.js";

function detailsTemplate(
  {
    imageUrl,
    title,
    category,
    salary,
    description,
    requirements,
    _ownerId,
    _id,
  },
  applications,
  applicationsCount,
  user
) {
  return html`
    <section id="details">
      <div id="details-wrapper">
        <img id="details-img" src="${imageUrl}" alt="example1" />
        <p id="details-title">${title}</p>
        <p id="details-category">
          Category: <span id="categories">${category}</span>
        </p>
        <p id="details-salary">Salary: <span id="salary-number">${salary}</span></p>
        <div id="info-wrapper">
          <div id="details-description">
            <h4>Description</h4>
            <span
              >${description}</span
            >
          </div>
          <div id="details-requirements">
            <h4>Requirements</h4>
            <span
              >${requirements}</span
            >
          </div>
        </div>
        <p>Applications: <strong id="applications">${applications}</strong></p>

        ${
          user
            ? html`
                <div id="action-buttons">
                  ${_ownerId == user._id
                    ? html`
                        <!--Edit and Delete are only for creator-->
                        <a href="${`/edit/${_id}`}" id="edit-btn">Edit</a>
                        <a href=${`/delete/${_id}`} id="delete-btn">Delete</a>
                      `
                    : nothing}
                  ${_ownerId !== user._id && applicationsCount == 0
                    ? html` <a href="${`/apply/${_id}`}" id="apply-btn"
                        >Apply</a
                      >`
                    : nothing}
                </div>
              `
            : nothing
        }

        </div>
      </div>
    </section>
  `;
}

export async function detailsView(ctx) {
  const id = ctx.params.id;
  const data = await getById(id);
  const applications = await getApplications(id);
  const user = ctx.user || null;
  const applicationsCount = await getApplicationsCount(id, user._id);

  ctx.render(detailsTemplate(data, applications, applicationsCount, user));
}
