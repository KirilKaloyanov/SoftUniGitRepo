import { page, render } from './lib.js';
import { navView } from './views/navigation.js';
import { homeView } from './views/home.js';
import { getUserData } from "./util/userSession.js";
import { catalogView } from './views/catalog.js';
import { detailsView } from './views/details.js';
import { registerView } from './views/register.js';
import { loginView } from './views/login.js';
import { logout } from './service/userService.js';
import { createView } from './views/create.js';
import { deleteRecord } from './views/delete.js';
import { editView } from './views/edit.js';
import { likeRecord } from './views/like.js';

page(decorateContext);
page(navView);
page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logout);
page('/catalog', catalogView);
page('/details/:id', detailsView);
page('/create', createView);
page('/edit/:id', editView);
page('/delete/:id', deleteRecord);
page('/like/:id', likeRecord);
page();

function decorateContext(ctx, next) {
    const user = getUserData();
    ctx.user = user;
    ctx.render = function (template) {
        render(template, document.querySelector('main'));
    }
    next();
}
