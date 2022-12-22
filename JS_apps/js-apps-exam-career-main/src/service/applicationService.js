import { request } from "../util/request.js";

export async function getApplicationsCount(offerId, userId) {
  return await request(
    "get",
    `/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`
  );
}

export async function applyItem(offerId) {
    return await request('post', `/data/applications`, {offerId})

}

export async function getApplications(offerId) {
    return await request('get', `/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`)
}