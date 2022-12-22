export function getUserData() {

    const email = sessionStorage.getItem('email');
    const accessToken = sessionStorage.getItem('accessToken');
    const _id = sessionStorage.getItem('_id');

    if (accessToken) {
        return {email, accessToken, _id}
    } else return null;
    
}
export function setUserData(user) {
    sessionStorage.setItem('email', user.email);
    sessionStorage.setItem('accessToken', user.accessToken);
    sessionStorage.setItem('_id', user._id);
}
export function clearUserData() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('_id');
}
