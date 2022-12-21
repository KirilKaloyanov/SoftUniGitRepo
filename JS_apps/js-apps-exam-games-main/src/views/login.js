import { html } from "../lib.js";
import { handler } from "../util/handler.js";
import { login } from "../service/userService.js";

function loginTemplate(onLogin) {
  return html`
    <section id="login-page" class="auth">
      <form id="login" @submit="${onLogin}">
        <div class="container">
          <div class="brand-logo"></div>
          <h1>Login</h1>
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Sokka@gmail.com"
          />

          <label for="login-pass">Password:</label>
          <input type="password" id="login-password" name="password" />
          <input type="submit" class="btn submit" value="Login" />
          <p class="field">
            <span>If you don't have profile click <a href="/register">here</a></span>
          </p>
        </div>
      </form>
    </section>
  `;
}

export async function loginView(ctx) {
  ctx.render(loginTemplate(handler(onSubmit)));

  async function onSubmit(data) {
    try {
      await login({ email: data.email, password: data.password });

      ctx.page.redirect("/");
    } catch (err) {}
  }
}
