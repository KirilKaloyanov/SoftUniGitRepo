import { html } from "../lib.js";
import { handler } from "../util/handler.js";
import { login } from "../service/userService.js";

function loginTemplate(onLogin) {
  return html`
    <section id="loginPage">
      <form class="loginForm" @submit=${onLogin}>
        <img src="/images/logo.png" alt="logo" />
        <h2>Login</h2>

        <div>
          <label for="email">Email:</label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="steven@abv.bg"
            value=""
          />
        </div>

        <div>
          <label for="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            value=""
          />
        </div>

        <button class="btn" type="submit">Login</button>

        <p class="field">
          <span>If you don't have profile click <a href="/register">here</a></span>
        </p>
      </form>
    </section>
  `;
}

export async function loginView(ctx) {
  ctx.render(loginTemplate(handler(onSubmit)));

  async function onSubmit(data) {
    try {
      await login({ email: data.email, password: data.password });

      ctx.page.redirect("/catalog");
    } catch (err) {}
  }
}
