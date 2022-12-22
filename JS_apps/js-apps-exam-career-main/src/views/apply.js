import { applyItem } from "../service/applicationService.js";

export async function applyRecord(ctx){
    const id = ctx.params.id;
    try { 
        await applyItem(id);
        ctx.page.redirect(`/details/${id}`);
    } catch(err) {}
}