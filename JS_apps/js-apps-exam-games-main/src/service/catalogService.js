import { request } from "../util/request.js"


export async function getAll() {
    return await request('get', '/data/games?sortBy=_createdOn%20desc')
} 

export async function getAllNew() {
    return await request('get', '/data/games?sortBy=_createdOn%20desc&distinct=category')
}

export async function getById(id) {
    return await request('get', `/data/games/${id}`);
}


export async function createItem(item) {
    return await request('post', '/data/games', item);
}

export async function deleteItem(id){
    return await request('delete', `/data/games/${id}`)
}

export async function editItem(id, item) {
    return await request('put', `/data/games/${id}`, item)
}