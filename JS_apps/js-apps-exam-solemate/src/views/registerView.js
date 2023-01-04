import { html } from "../library.js";
import { register } from "../services/userService.js";
import { handler } from "../util/handler.js";

function registerView(onRegister) {
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

export async function registerTemplate(ctx) {
    ctx.render(registerView(handler(onRegister)));
    async function onRegister(data) {
        if (data['password'] != data['re-password']) {
            return alert('Passwords dont match');
        }

        await register(data);
        ctx.page.redirect('/dashboard');
    }
}
