import { request } from "../util/request.js";

export async function getAllComments(gameId) {
    return await request('get', `/data/comments?where=gameId%3D%22${gameId}%22`);
}

export async function createComment(data) {
    return await request('post', `/data/comments`, data);
}

