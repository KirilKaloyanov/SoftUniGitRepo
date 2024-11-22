import { html, nothing } from "../lib.js";

export const navbarTemplate = (user) => html`
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/recipes">Catalog</a>
  ${user
    ? html`
        <a href="/create">Create</a>
        <a href="/logout">Logout</a>
      `
    : nothing}
  ${!user
    ? html`
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      `
    : nothing}
`;
