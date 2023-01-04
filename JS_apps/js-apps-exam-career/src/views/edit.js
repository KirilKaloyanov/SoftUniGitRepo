import {html} from '../lib.js';
import { getById, editItem } from '../service/catalogService.js';
import { handler } from '../util/handler.js';

function editTemplate({
    title,
    imageUrl, 
    category, 
    description, 
    requirements, 
    salary
  } 
  , onEdit) {
    return html`
    <section id="edit">
          <div class="form">
            <h2>Edit Offer</h2>
            <form class="edit-form" @submit=${onEdit}>
              <input
              .value="${title}"
                type="text"
                name="title"
                id="job-title"
                placeholder="Title"
              />
              <input
              .value="${imageUrl}"
                type="text"
                name="imageUrl"
                id="job-logo"
                placeholder="Company logo url"
              />
              <input
              .value="${category}"
                type="text"
                name="category"
                id="job-category"
                placeholder="Category"
              />
              <textarea
              .value="${description}"
                id="job-description"
                name="description"
                placeholder="Description"
                rows="4"
                cols="50"
              ></textarea>
              <textarea
              .value="${requirements}"
                id="job-requirements"
                name="requirements"
                placeholder="Requirements"
                rows="4"
                cols="50"
              ></textarea>
              <input
              .value="${salary}"
                type="text"
                name="salary"
                id="job-salary"
                placeholder="Salary"
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>
    `
}

export async function editView(ctx) {
    const id = ctx.params.id;
    const item = await getById(id);
    ctx.render(editTemplate(item, handler(onSubmit)));

    async function onSubmit(data){
        
        try {
            await editItem(id, data);
            ctx.page.redirect('/catalog');
        } catch(err){}
    }
}