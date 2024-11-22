import { page, render } from "./library.js";
import { headerTemplate } from "./views/headerView.js";
import { homeTemplate } from "./views/homeView.js";
import { dashboardTemplate } from "./views/dashboardView.js";
import { loginTemplate } from "./views/loginView.js";
import { logout } from './services/userService.js'
import { getUserData } from "./util/userData.js";
import { registerTemplate } from "./views/registerView.js";
import { detailsTemplate } from "./views/detailsView.js";
import { createTemplate } from "./views/createView.js";
import { editTemplate } from "./views/editView.js";
import { deleteHandler } from "./util/deleteHandler.js";
import { searchTemplate } from "./views/searchView.js";



page(decorateContext);
page(headerTemplate);
page("/", homeTemplate);
page("/dashboard", dashboardTemplate);
page('/create', createTemplate);
page("/catalog/:id", detailsTemplate);
page('/edit/:id', editTemplate);
page('/delete/:id', deleteHandler);
page('/login', loginTemplate);
page('/register', registerTemplate);
page('/search', searchTemplate);
page('/logout', logout)
page.start();

function decorateContext(ctx, next) {
  ctx.render = (view) => {
    render(view, document.querySelector("main"));
  };
  ctx.user = getUserData;
  next();
}
