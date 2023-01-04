import { request } from "../util/request.js";

export async function donateAction(ctx) {
  const petId = ctx.params.id;
  console.log(petId);
  try {
    await request("post", `/data/donation`, { petId });
    ctx.page.redirect(`/details/${petId}`);
  } catch (err) {console.log(err)}
}
