import { clearUserData, setUserData } from "../util/userSession.js";
import { request } from "../util/request.js";

export async function login(user) {
  try {
    const userData = await request("post", "/users/login", user);
    setUserData(userData);
  } catch (err) {throw err}
}

export async function register(user) {
  try {
    const userData = await request('post', '/users/register', user);
    setUserData(userData);
  } catch (err) {throw err}
}

export async function logout(ctx) {
    await request('get', '/users/logout');
    clearUserData();
    ctx.page.redirect('/');
}