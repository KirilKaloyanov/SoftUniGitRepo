import { deleteItem } from "../services/dataService.js";

export async function deleteHandler(ctx){
    const id = ctx.params.id;
    await deleteItem(id);
    ctx.page.redirect('/dashboard');
}