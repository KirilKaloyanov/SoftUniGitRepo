import { html } from "../lib.js";
import { register } from "../service/userService.js";
import { handler } from "../util/handler.js";

function registerTemplate(onRegister) {
  return html`
    <section id="register">
      <div class="form">
        <h2>Register</h2>
        <form class="login-form" @submit=${onRegister}>
          <input
            type="text"
            name="email"
            id="register-email"
            placeholder="email"
          />
          <input
            type="password"
            name="password"
            id="register-password"
            placeholder="password"
          />
          <input
            type="password"
            name="re-password"
            id="repeat-password"
            placeholder="repeat password"
          />
          <button type="submit">register</button>
          <p class="message">Already registered? <a href="/login">Login</a></p>
        </form>
      </div>
    </section>
  `;
}

export async function registerView(ctx) {
  ctx.render(registerTemplate(handler(onSubmit)));

  async function onSubmit(data) {
    const email = data.email;
    const password = data.password;
    const repass = data["re-password"];

    if (password != repass) {
      return alert("Passwords don't match.");
    }

    try {
      await register({ email, password });
      ctx.page.redirect("/catalog");
    } catch (err) {}
  }
}
