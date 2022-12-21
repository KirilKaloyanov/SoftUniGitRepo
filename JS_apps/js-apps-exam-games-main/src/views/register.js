import { html } from "../lib.js";
import { register } from "../service/userService.js";
import { handler } from "../util/handler.js";

function registerTemplate(onRegister) {
  return html`
    <section id="register-page" class="content auth">
      <form id="register" @submit="${onRegister}">
        <div class="container">
          <div class="brand-logo"></div>
          <h1>Register</h1>

          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="maria@email.com"
          />

          <label for="pass">Password:</label>
          <input type="password" name="password" id="register-password" />

          <label for="con-pass">Confirm Password:</label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
          />

          <input class="btn submit" type="submit" value="Register" />

          <p class="field">
            <span>If you already have profile click <a href="#">here</a></span>
          </p>
        </div>
      </form>
    </section>
  `;
}

export async function registerView(ctx) {
  ctx.render(registerTemplate(handler(onSubmit)));

  async function onSubmit(data) {
    const email = data.email;
    const password = data.password;
    const repass = data["confirm-password"];

    if (password != repass) {
      return alert("Passwords don't match.");
    }

    try {
      await register({ email, password });
      ctx.page.redirect("/");
    } catch (err) {}
  }
}
