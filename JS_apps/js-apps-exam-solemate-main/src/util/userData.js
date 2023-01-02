export function getUserData() {
    const email = sessionStorage.getItem('email');
    const accessToken = sessionStorage.getItem('accessToken');
    const _id = sessionStorage.getItem('_id');
    if (accessToken) {

        return {
            email,
            accessToken,
            _id
        }
    } else return null;
}

export function setUserData(data) {
    sessionStorage.setItem('email', data.email);
    sessionStorage.setItem('accessToken', data.accessToken);
    sessionStorage.setItem('_id', data._id);
}

export function clearUserData() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('_id');
}