import { html, nothing } from "../lib.js";
import { getById } from "../service/catalogService.js";
import { createComment, getAllComments } from "../service/commentService.js";
import { handler } from "../util/handler.js";

function detailsTemplate(
  { title, category, maxLevel, imageUrl, summary, _id, _ownerId },
  user,
  comments,
  onComment
) {
  return html`
    <section id="game-details">
      <h1>Game Details</h1>
      <div class="info-section">
        <div class="game-header">
          <img class="game-img" src="${imageUrl}" />
          <h1>${title}</h1>
          <span class="levels">MaxLevel: ${maxLevel}</span>
          <p class="type">${category}</p>
        </div>

        <p class="text">${summary}</p>

        <!-- Bonus ( for Guests and Users ) -->
        <div class="details-comments">
          <h2>Comments:</h2>
          <ul>
            <!-- list all comments for current game (If any) -->
            ${comments.length > 0 ? comments.map(commentCard) : nothing}
          </ul>
          <!-- Display paragraph: If there are no games in the database -->
          ${comments.length == 0
            ? html`<p class="no-comment">No comments.</p>`
            : nothing}
        </div>

        <!-- Edit/Delete buttons ( Only for creator of this game )  -->
        ${user && user._id == _ownerId
          ? html`
              <div class="buttons">
                <a href="${`/edit/${_id}`}" class="button">Edit</a>
                <a href="${`/delete/${_id}`}" class="button">Delete</a>
              </div>
            `
          : nothing}
      </div>

      <!-- Bonus -->
      <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
      ${user && user._id != _ownerId
        ? html`
            <article class="create-comment">
              <label>Add new comment:</label>
              <form class="form" @submit="${onComment}">
                <textarea name="comment" placeholder="Comment......"></textarea>
                <input class="btn submit" type="submit" value="Add Comment" />
              </form>
            </article>
          `
        : nothing}
    </section>
  `;
}

export async function detailsView(ctx) {
  const id = ctx.params.id;
  const data = await getById(id);
  const user = ctx.user;
  const comments = await getAllComments(id);
  
  ctx.render(detailsTemplate(data, user, comments, handler(onComment)));
  
  async function onComment(input) {
    
    const commentObject = {
      gameId: id,
      comment: input.comment
    }

    await createComment(commentObject);
    ctx.page.redirect(`/details/${id}`)
  }
}

function commentCard(comment) {
  return html`
    <li class="comment">
      <p>Content: ${comment.comment}</p>
    </li>
  `;
}
