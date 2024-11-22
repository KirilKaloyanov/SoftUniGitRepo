import { html, nothing } from "../library.js";
import { search } from "../services/dataService.js";
import { handler } from "../util/handler.js";

export async function searchTemplate(ctx) {
  if (ctx.querystring != "") {
    const data = await search(ctx.querystring);
    const user = ctx.user();
    ctx.render(searchView(handler(onSearch), data, user));
  } else {
    ctx.render(searchView(handler(onSearch)));
  }

  function onSearch(str) {
    ctx.page.redirect("/search?" + str.search);
  }
}

function searchView(onSubmit, data, user) {
  return html`
    <section id="search">
      <h2>Search by Brand</h2>

      <form class="search-wrapper cf" @submit=${onSubmit}>
        <input
          id="#search-input"
          type="text"
          name="search"
          placeholder="Search here..."
          required
        />
        <button type="submit">Search</button>
      </form>

      <h3>Results:</h3>
      ${results(data, user)}
    </section>
  `;
}

function results(data, user) {
    if (data == undefined) return;
  if (data.length > 0) {
    return html`
      <div id="search-container">
        <ul class="card-wrapper">
          ${data.map((c) => card(c, user))} f
        </ul>
      </div>
    `;
  } else {
    return html`<h2>There are no results found.</h2>`;
  }
}

function card({ brand, model, imageUrl, value, _id }, user) {
  return html`
    <li class="card">
      <img src="${imageUrl}" alt="eminem" />
      <p><strong>Brand: </strong><span class="brand">${brand}</span></p>
      <p><strong>Model: </strong><span class="model">${model}</span></p>
      <p><strong>Value:</strong><span class="value">${value}</span>$</p>
      ${user != undefined
        ? html`<a class="details-btn" href="/catalog/${_id}">Details</a>`
        : nothing}
    </li>
  `;
}
