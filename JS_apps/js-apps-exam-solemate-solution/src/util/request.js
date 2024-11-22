import { clearUserData, getUserData } from "./userData.js";

const host = "http://localhost:3030";

export async function request(method, url, data) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };
const user = getUserData();

if (user != undefined || user != null) {
    options.headers["X-Authorization"] = user.accessToken;
}

if (data != undefined) {
    options.body = JSON.stringify(data);
}

  try {
    const response = await fetch(host + url, options);

    if (!response.ok) {
      if (response.status == 403) {
        clearUserData();
      }
      const errors = await response.json();
      throw new Error(errors.message);
    }

    if (response.status == 204) {
      return response;
    }

    const result = await response.json();
    return result;
  } catch (err) {
    alert(err.message);
    throw err;
  }
}

