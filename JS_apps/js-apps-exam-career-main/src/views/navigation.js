import { html, render, nothing } from "../lib.js";

function navTemplate(user) {
  return html`
    <a id="logo" href="/"
      ><img id="logo-img" src="/images/logo.jpg" alt=""
    /></a>

    <nav>
      <div>
        <a href="/catalog">Dashboard</a>
      </div>

      ${
        user
          ? html`
                <!-- Logged-in users -->
                <div class="user">
                  <a href="/create">Create Offer</a>
                  <a href="/logout">Logout</a>
                </div>
          `
          : nothing
      }

      ${
        !user
          ? html`
          <!-- Guest users -->
          <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>
          `
          : nothing
      }

    </nav>
  `;
}

export function navView(ctx, next) {
  render(navTemplate(ctx.user), document.querySelector("header"));

  next();
}
