import { request } from '../util/request.js';
import { setUserData, clearUserData } from '../util/userData.js';

export async function login(user) {
    const result = await request('post','/users/login', user);
    setUserData(result);
}

export async function register(user) {
    const result = await request('post','/users/register', user);
    setUserData(result);
}


export async function logout(ctx) {
    await request('get', '/users/logout')
    clearUserData();
    ctx.page.redirect('/dashboard');
  }
  