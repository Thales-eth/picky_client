import InitAxios from "./init.service";

class AuthService extends InitAxios {
    constructor() {
        super('auth')
    }

    signup(body) {
        return this.api.post('/create', body).then(({ data }) => data)
    }

    login(body) {
        return this.api.post('/login', body).then(({ data }) => data)
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new AuthService()
        }

        return this.instance
    }

}

export default AuthService.getInstance()