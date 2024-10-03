import axios from "axios"

const APP_BASE_URL = "http://localhost:8080/api/v1/home"

class AppService {
    getHome() {
        return axios.get(APP_BASE_URL)
    }
}

export default new AppService()