import { html } from '../library.js';
import { handler } from '../util/handler.js';
import { login } from '../services/userService.js';

function loginView(onLogin) {
    return html`
        <section id="login">
          <div class="form">
            <h2>Login</h2>
            <form class="login-form" @submit="${onLogin}">
              <input type="text" name="email" id="email" placeholder="email" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
              <button type="submit">login</button>
              <p class="message">
                Not registered? <a href="/register">Create an account</a>
              </p>
            </form>
          </div>
        </section>
    `
}

export function loginTemplate(ctx) {
    ctx.render(loginView(handler(onLogin)));

    
    async function onLogin(data) {
      await login(data);
      ctx.page.redirect('/dashboard');
    }
}