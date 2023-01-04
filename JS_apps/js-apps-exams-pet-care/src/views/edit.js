import { html } from "../lib.js";
import { getById, editItem } from "../service/catalogService.js";
import { handler } from "../util/handler.js";

function editTemplate(
  { name, image, breed, age, weight },
  onEdit
) {
  return html`
    <section id="editPage">
      <form class="editForm" @submit="${onEdit}">
        <img src="/images/editpage-dog.jpg" />
        <div>
          <h2>Edit PetPal</h2>
          <div class="name">
            <label for="name">Name:</label>
            <input name="name" id="name" type="text" .value="${name}" />
          </div>
          <div class="breed">
            <label for="breed">Breed:</label>
            <input name="breed" id="breed" type="text" .value="${breed}" />
          </div>
          <div class="Age">
            <label for="age">Age:</label>
            <input name="age" id="age" type="text" .value="${age}" />
          </div>
          <div class="weight">
            <label for="weight">Weight:</label>
            <input name="weight" id="weight" type="text" .value="${weight}" />
          </div>
          <div class="image">
            <label for="image">Image:</label>
            <input
              name="image"
              id="image"
              type="text"
              .value="${image}"
            />
          </div>
          <button class="btn" type="submit">Edit Pet</button>
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
      ctx.page.redirect("/catalog");
    } catch (err) {}
  }
}
