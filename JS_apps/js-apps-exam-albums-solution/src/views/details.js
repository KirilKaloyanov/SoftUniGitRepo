import { html, nothing } from "../lib.js";
import { getById } from "../service/catalogService.js";
import { getLikes, getLikesPerUser } from "../service/likeService.js";

function detailsTemplate(
  { singer, album, imageUrl, release, label, sales, _ownerId, _id },
  user, likes, userLikes
) {
  return html`
    <section id="details">
      <div id="details-wrapper">
        <p id="details-title">Album Details</p>
        <div id="img-wrapper">
          <img src="${imageUrl}" alt="example1" />
        </div>
        <div id="info-wrapper">
          <p>
            <strong>Band:</strong><span id="details-singer">${singer}</span>
          </p>
          <p>
            <strong>Album name:</strong><span id="details-album">${album}</span>
          </p>
          <p>
            <strong>Release date:</strong
            ><span id="details-release">${release}</span>
          </p>
          <p><strong>Label:</strong><span id="details-label">${label}</span></p>
          <p><strong>Sales:</strong><span id="details-sales">${sales}</span></p>
        </div>
        <div id="likes">Likes: <span id="likes-count">${likes}</span></div>

        <!--Edit and Delete are only for creator-->
        <div id="action-buttons">
          ${
            user._id
            ? user._id === _ownerId
              ? html`
                  <a href="${`/edit/${_id}`}" id="edit-btn">Edit</a>
                  <a href="${`/delete/${_id}`}" id="delete-btn">Delete</a>
                `
              : userLikes == 0
              ? html` <a href="${`/like/${_id}`}" id="like-btn">Like</a> `
              : nothing
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
  const user = ctx.user || {};
  const likes = await getLikes(id);
  const userLikes = await getLikesPerUser(id, user._id);

  ctx.render(detailsTemplate(data, user, likes, userLikes));
}
