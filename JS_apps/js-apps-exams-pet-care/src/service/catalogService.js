import { request } from "../util/request.js"


export async function getAll() {
    return await request('get', '/data/pets?sortBy=_createdOn%20desc&distinct=name')
}

export async function getById(id) {
    return await request('get', `/data/pets/${id}`);
}


export async function createItem(item) {
    return await request('post', '/data/pets', item);
}

export async function deleteItem(id){
    return await request('delete', `/data/pets/${id}`)
}

export async function editItem(id, item) {
    return await request('put', `/data/pets/${id}`, item)
}