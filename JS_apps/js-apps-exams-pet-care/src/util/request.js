import { clearUserData, getUserData } from "./userSession.js";

const host = "http://localhost:3030";
export async function request(method, url, data) {
  const options = {
    method,
    headers: {}
  };

  if (data !== undefined) {
    options.headers["Content-Type"] = "application/json",

    options.body = JSON.stringify(data);
  }

  const user = getUserData();
  if (user != null) {

    options.headers['X-Authorization'] = user.accessToken; //X-Authorization 
  }

  try {
    const response = await fetch(host + url, options);

    if (response.ok == true) {
      if (response.status == 204) {
        return response;
      }
      const result = await response.json();
      return result;
    } else {
        if (response.status == 403) {
            clearUserData();
        }
        const error = await response.json();
      throw error;
    }
  } catch (err) {
    alert(err.message);
    throw err;
  }
}
