import authHeader from './auth-header'
import ConfigService from './config.service';

class ProfileService {
    async getProfileInfo() {
        let auth = authHeader();
        const config = await ConfigService.getConfig();
        let result = { status: null, data: null};
        const response = await fetch(config["IdentityUrl"] + "/api/account/profile", {
            headers: {
                'Content-Type': 'application/json',
                ...auth
            }
        });

        result.status = response.status;
        if(response.ok) {
            result.data = await response.json();
        }
        else
            result.data = await response.text();

        return result;
    }
}

export default new ProfileService();