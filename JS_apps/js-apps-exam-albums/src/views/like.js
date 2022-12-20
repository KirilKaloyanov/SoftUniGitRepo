import { addLike } from "../service/likeService.js";

export async function likeRecord(ctx) {
    const id = ctx.params.id;
    const user = ctx.user;
    try {
        await addLike(id, user._id);
        ctx.page.redirect(`/details/${id}`)
    } catch(err) {}
}