import { html, render, nothing } from "../lib.js";

function navTemplate(user) {
  return html`
    <nav>
      <section class="logo">
        <img src="/images/logo.png" alt="logo" />
      </section>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/catalog">Dashboard</a></li>

        ${user
          ? html`
              <!-- Logged-in users -->
              <li><a href="/create">Create Postcard</a></li>
              <li><a href="/logout">Logout</a></li>
            `
          : nothing}
        ${!user
          ? html`
              <!-- Guest users -->
              <li><a href="/login">Login</a></li>
              <li><a href="/register">Register</a></li>
            `
          : nothing}
      </ul>
    </nav>
  `;
}

export function navView(ctx, next) {
  render(navTemplate(ctx.user), document.querySelector("header"));

  next();
}
