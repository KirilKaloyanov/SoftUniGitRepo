import { html } from "../lib.js";
import { getById, editItem } from "../service/catalogService.js";
import { handler } from "../util/handler.js";

function editTemplate(
  { title, category, maxLevel, imageUrl, summary },
  onEdit
) {
  return html`
    <section id="edit-page" class="auth">
      <form id="edit" @submit="${onEdit}">
        <div class="container">
          <h1>Edit Game</h1>
          <label for="leg-title">Legendary title:</label>
          <input type="text" id="title" name="title" .value="${title}" />

          <label for="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            .value="${category}"
          />

          <label for="levels">MaxLevel:</label>
          <input
            type="number"
            id="maxLevel"
            name="maxLevel"
            min="1"
            .value="${maxLevel}"
          />

          <label for="game-img">Image:</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            .value="${imageUrl}"
          />

          <label for="summary">Summary:</label>
          <textarea name="summary" id="summary">${summary}</textarea>
          <input class="btn submit" type="submit" value="Edit Game" />
        </div>
      </form>
    </section>
  `;
}

export async function editView(ctx) {
  const id = ctx.params.id;
  const item = await getById(id);
  ctx.render(editTemplate(item, handler(onSubmit)));

  async function onSubmit(data) {
    try {
      await editItem(id, data);
      ctx.page.redirect(`/details/${item._id}`);
    } catch (err) {}
  }
}
