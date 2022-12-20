import { html, render, nothing } from "../lib.js";

function navTemplate(user) {
  return html`
    <!-- Navigation -->
    <a id="logo" href="/"
      ><img id="logo-img" src="/images/logo.png" alt=""
    /></a>

    <nav>
      <div>
        <a href="/catalog">Dashboard</a>
      </div>

      <!-- Logged-in users -->
      ${
        user
        ? html`
        <div class="user">
          <a href="/create">Add Album</a>
          <a href="/logout">Logout</a>
        </div>
        `
        : html`
        <!-- Guest users -->
        <div class="guest">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
        `
      }

    </nav>
  `;
}

export function navView(ctx, next) {
  render(navTemplate(ctx.user), document.querySelector("header"));

  next();
}
