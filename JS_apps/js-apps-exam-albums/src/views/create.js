import { html } from "../lib.js";
import { createItem } from "../service/catalogService.js";
import { handler } from "../util/handler.js";

function createTemplate(onCreate) {
  return html`
    <section id="create">
        <div class="form">
          <h2>Add Album</h2>
          <form class="create-form" @submit=${onCreate}>
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
            <input type="text" name="album" id="album-album" placeholder="Album" />
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
            <input type="text" name="release" id="album-release" placeholder="Release date" />
            <input type="text" name="label" id="album-label" placeholder="Label" />
            <input type="text" name="sales" id="album-sales" placeholder="Sales" />

            <button type="submit">post</button>
          </form>
        </div>
      </section>
  `;
}

export async function createView(ctx) {
  ctx.render(createTemplate(handler(onSubmit)));

  async function onSubmit(data) {
    try {
      await createItem(data);
      ctx.page.redirect("/catalog");
    } catch (err) {}
  }
}
