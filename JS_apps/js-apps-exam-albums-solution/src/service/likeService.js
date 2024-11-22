import { request } from '../util/request.js';

export async function addLike(id) {
    return await request('post', '/data/likes', {albumId: id})
}

export async function getLikes(albumId) {
    return await request('get', `/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`)
}

export async function getLikesPerUser(albumId, userId) {
    return await request('get', `/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}