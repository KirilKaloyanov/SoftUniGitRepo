import { html } from "../lib.js";
import { getById, editItem } from "../service/catalogService.js";
import { handler } from "../util/handler.js";

function editTemplate(
  { singer, album, imageUrl, release, label, sales },
  onEdit
) {
  return html`
    <section id="edit">
      <div class="form">
        <h2>Edit Album</h2>
        <form class="edit-form" @submit="${onEdit}">
          <input
            type="text"
            name="singer"
            id="album-singer"
            placeholder="Singer/Band"
            .value=${singer}
          />
          <input
            type="text"
            name="album"
            id="album-album"
            placeholder="Album"
            .value=${album}
          />
          <input
            type="text"
            name="imageUrl"
            id="album-img"
            placeholder="Image url"
            .value=${imageUrl}
          />
          <input
            type="text"
            name="release"
            id="album-release"
            placeholder="Release date"
            .value=${release}
          />
          <input
            type="text"
            name="label"
            id="album-label"
            placeholder="Label"
            .value=${label}
          />
          <input
            type="text"
            name="sales"
            id="album-sales"
            placeholder="Sales"
            .value=${sales}
          />

          <button type="submit">post</button>
        </form>
      </div>
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
      ctx.page.redirect(`/details/${id}`);
    } catch (err) {}
  }
}
