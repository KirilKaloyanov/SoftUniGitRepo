import { page } from './lib.js';
import { render, html, nothing } from '../node_modules/lit-html/lit-html.js';

import { showAbout } from './views/about.js';
import { showCatalog } from './views/catalog.js';
import { showCreate } from './views/create.js';
import { showDetails } from './views/details.js';
import { showHome } from './views/home.js';
import { notFound } from './views/notFound.js';
import { showLogin } from './views/login.js';
import { getUserData } from './util.js';
import { showRegsiter } from './views/register.js';
import { logout } from './data/auth.js';
import { navbarTemplate } from './views/navbar.js';




function onLogout(ctx) {
    logout();
    ctx.page.redirect('/');
}

function decorateContext(ctx, next) {
    ctx.render = function (content) {
        render(content, document.querySelector('main'));
    };
    render(navbarTemplate(ctx.user), document.querySelector('nav    '));
    next();
}

function parseQuery(ctx, next) {
    ctx.query = {};
    if (ctx.querystring) {
        const query = Object.fromEntries(ctx.querystring.split('&').map(s => s.split('=')));
        Object.assign(ctx.query, query);
    }
    next();
}

function session(ctx, next) {
    const user = getUserData();
    if (user) {
        ctx.user = user;
    }
    next();
}

page(session);
page(decorateContext);
page(parseQuery);


page('/index.html', '/');
page('/', showHome);
page('/recipes', showCatalog);
page('/create', showCreate);
page('/recipes/:id', showDetails);
page('/about', showAbout);
page('/login', showLogin);
page('/register', showRegsiter);
page('/logout', onLogout);
page('*', notFound);

page.start();