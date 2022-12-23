import { html } from "../lib.js";
import { register } from "../service/userService.js";
import { handler } from "../util/handler.js";

function registerTemplate(onRegister) {
  return html`
    <section id="registerPage">
      <form class="registerForm" @submit="${onRegister}">
        <img src="/images/logo.png" alt="logo" />
        <h2>Register</h2>
        <div class="on-dark">
          <label for="email">Email:</label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="steven@abv.bg"
            value=""
          />
        </div>

        <div class="on-dark">
          <label for="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            value=""
          />
        </div>

        <div class="on-dark">
          <label for="repeatPassword">Repeat Password:</label>
          <input
            id="repeatPassword"
            name="repeatPassword"
            type="password"
            placeholder="********"
            value=""
          />
        </div>

        <button class="btn" type="submit">Register</button>

        <p class="field">
          <span>If you have profile click <a href="#">here</a></span>
        </p>
      </form>
    </section>
  `;
}

export async function registerView(ctx) {
  ctx.render(registerTemplate(handler(onSubmit)));

  async function onSubmit(data) {
    const email = data.email;
    const password = data.password;
    const repass = data["repeatPassword"];

    if (password != repass) {
      return alert("Passwords don't match.");
    }

    try {
      await register({ email, password });
      ctx.page.redirect("/catalog");
    } catch (err) {}
  }
}
