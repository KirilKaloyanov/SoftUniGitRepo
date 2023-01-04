import { request } from "../util/request.js";

export async function getDonationByUser(petId, userId) {
  return await request(
    "get",
    `/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`
  );
}
export async function getDonationsCount(petId) {
  return await request(
    "get",
    `/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`
  );
}

