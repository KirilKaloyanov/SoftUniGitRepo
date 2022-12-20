import { request } from "../util/request.js"


export async function getAll() {
    return await request('get', '/data/albums?sortBy=_createdOn%20desc')
}

export async function getById(id) {
    return await request('get', `/data/albums/${id}`);
}


export async function createItem(item) {
    return await request('post', '/data/albums', item);
}

export async function deleteItem(id){
    return await request('delete', `/data/albums/${id}`)
}

export async function editItem(id, item) {
    return await request('put', `/data/albums/${id}`, item)
}