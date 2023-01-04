import { html } from "../lib.js";
import { handler } from "../util/handler.js";
import { login } from "../service/userService.js";

function loginTemplate(onLogin) {
  return html`
    <main>
      <section @submit=${onLogin} id="login">
        <div class="form">
          <h2>Login</h2>
          <form class="login-form">
            <input type="text" name="email" id="email" placeholder="email" />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
            <button type="submit">login</button>
            <p class="message">
              Not registered? <a href="#">Create an account</a>
            </p>
          </form>
        </div>
      </section>
    </main>
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
