import { html } from '../library.js';
import { editItem, getById } from '../services/dataService.js';
import { handler } from '../util/handler.js';

export async function editTemplate(ctx) {
    const id = ctx.params.id;
    const currentItem = await getById(id);
    ctx.render(editView(currentItem, handler(onEdit)));

    async function onEdit(newItem) {
        await editItem(id, newItem);
        ctx.page.redirect('/dashboard')
    }
}

function editView({ brand, model, imageUrl, value, release, designer }, onSubmit) {
    return html `
    <section id="edit">
          <div class="form">
            <h2>Edit item</h2>
            <form class="edit-form" @submit=${onSubmit}>
              <input
                type="text"
                name="brand"
                id="shoe-brand"
                placeholder="Brand"
                .value="${brand}"
              />
              <input
                type="text"
                name="model"
                id="shoe-model"
                placeholder="Model"
                .value="${model}"
              />
              <input
                type="text"
                name="imageUrl"
                id="shoe-img"
                placeholder="Image url"
                .value="${imageUrl}"
              />
              <input
                type="text"
                name="release"
                id="shoe-release"
                placeholder="Release date"
                .value="${release}"
              />
              <input
                type="text"
                name="designer"
                id="shoe-designer"
                placeholder="Designer"
                .value="${designer}"
              />
              <input
                type="text"
                name="value"
                id="shoe-value"
                placeholder="Value"
                .value="${value}"
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>
    `
}