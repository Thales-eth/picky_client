import axios from 'axios'

class InitAxios {
    constructor(path) {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/${path}`
        })
    }
}

export default InitAxios