import { deleteItem } from "../service/catalogService.js";

export async function deleteRecord(ctx){
    const id = ctx.params.id;
    try { 
        await deleteItem(id);
        ctx.page.redirect('/catalog');
    } catch(err) {}
}