import {request}  from '../util/request.js';

export async function getAll() {
    return await request('get', '/data/shoes?sortBy=_createdOn%20desc');
}

export async function getById(id) {
    return await request('get', `/data/shoes/${id}`);
}

export async function createItem(data) {
    return await request('post', '/data/shoes', data);
}

export async function editItem(id, data) {
    return await request('put', `/data/shoes/${id}`, data)
}

export async function deleteItem(id) {
    return await request('delete', `/data/shoes/${id}`);
}

export async function search(query) {
    return await request('get', `/data/shoes?where=brand%20LIKE%20%22${query}%22`)
}