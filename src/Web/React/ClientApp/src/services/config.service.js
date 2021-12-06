class ConfigService {
    async getConfig()
    {
        let config = JSON.parse(sessionStorage.getItem("config"));
        if(config === null)
        {
            const response = await this.sendGetConfigRequest();
            if(response.status === 200)
            {
                config = response.data
                sessionStorage.setItem("config", JSON.stringify(config));
            }
            else
            {
                //Redirect to error page
            }
        }
        
        return config;
    }
    
    async sendGetConfigRequest() {
        let result = {status: null, data: null};
        const response = await fetch("/config", {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        result.status = response.status;
        if(response.ok)
            result.data = await response.json();

        return result;
    }
}

export default new ConfigService();