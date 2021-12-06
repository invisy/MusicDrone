export default function authHeader() {
    const userLocalStorage = JSON.parse(localStorage.getItem('user'));

    if (userLocalStorage && userLocalStorage.token) {
        return { Authorization: 'Bearer ' + userLocalStorage.token };
    } else {
        const userSessionStorage = JSON.parse(sessionStorage.getItem('user'));
        if(userSessionStorage && userSessionStorage.token)
            return { Authorization: 'Bearer ' + userSessionStorage.token };
        return "";
    }
}