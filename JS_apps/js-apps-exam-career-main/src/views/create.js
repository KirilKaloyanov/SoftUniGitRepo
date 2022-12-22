import { html } from "../lib.js";
import { createItem } from "../service/catalogService.js";
import { handler } from "../util/handler.js";

function createTemplate(onCreate) {
  return html`
    <section id="create">
      <div class="form">
        <h2>Create Offer</h2>
        <form class="create-form" @submit=${onCreate}>
          <input type="text" name="title" id="job-title" placeholder="Title" />
          <input
            type="text"
            name="imageUrl"
            id="job-logo"
            placeholder="Company logo url"
          />
          <input
            type="text"
            name="category"
            id="job-category"
            placeholder="Category"
          />
          <textarea
            id="job-description"
            name="description"
            placeholder="Description"
            rows="4"
            cols="50"
          ></textarea>
          <textarea
            id="job-requirements"
            name="requirements"
            placeholder="Requirements"
            rows="4"
            cols="50"
          ></textarea>
          <input
            type="text"
            name="salary"
            id="job-salary"
            placeholder="Salary"
          />

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
