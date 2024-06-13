import axios from "axios";

const AxiosService = axios.create({
    baseURL: "https://663711dd288fedf6937f54af.mockapi.io/",
    headers:{
        "Content-Type": "application/json"
    }

})

export default AxiosService