import { html, render } from "../library.js";

const headerView = (user) => html`
  <!-- Navigation -->
  <a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt="" /></a>

  <nav>
    <div>
      <a href="/dashboard">Dashboard</a>
      <a href="/search">Search</a>
    </div>

    ${user
      ? html`
          <div class="user">
            <a href="/create">Add Pair</a>
            <a href="/logout">Logout</a>
          </div>
        `
      : html`
          <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>
        `}
  </nav>
`;

export function headerTemplate(ctx, next) {
  const user = ctx.user();
  render(headerView(user), document.querySelector("header"));
  next();
}
