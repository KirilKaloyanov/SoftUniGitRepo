import { html, render, nothing } from "../lib.js";

function navTemplate(user) {
  return html`
    <h1><a class="home" href="/">GamesPlay</a></h1>
    <nav>
      <a href="/catalog">All games</a>
      ${user
        ? html`
            <div id="user">
              <a href="/create">Create Game</a>
              <a href="/logout">Logout</a>
            </div>
          `
        : html`
            <div id="guest">
              <a href="/login">Login</a>
              <a href="/register">Register</a>
            </div>
          `}
    </nav>
  `;
}

export function navView(ctx, next) {
  render(navTemplate(ctx.user), document.querySelector("header"));
  next();
}
