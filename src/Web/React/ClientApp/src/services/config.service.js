class AuthService {
    async config() {
        let result = {status: null, data: null};
        const response = await fetch("/config", {
            headers: {
                'Content-Type': 'application/json'
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