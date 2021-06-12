import ConfigService from './config.service';

class AuthService {
    async login(login, password, remember) {
        const config = await ConfigService.getConfig();
        let result = { status: null, data: null};
        const data = { login: login, password: password };
        const response = await fetch(config["IdentityUrl"] + "/api/account/login", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        result.status = response.status;
        if(response.ok) {
            result.data = await response.json();
            if(remember)
                localStorage.setItem("user", JSON.stringify(result.data));
            else
                sessionStorage.setItem("user", JSON.stringify(result.data));
        }
        else
            result.data = await response.text();

        return result;
    }

    logout() {
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
    }

    async register(firstname, lastname, email, password) {
        const config = await ConfigService.getConfig();
        let result = { status: null, data: null};
        const data = {name: firstname, surname: lastname, email: email, password: password };
        const response = await fetch(config["IdentityUrl"] + "/api/account/register", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        result.status = response.status;
        result.data = await response.text();
        
        return result;
    }
    
    getCurrentUser() {
        const userLocalStorage = JSON.parse(localStorage.getItem('user'));
        return userLocalStorage ? userLocalStorage: JSON.parse(sessionStorage.getItem('user'));
    }
}

export default new AuthService();