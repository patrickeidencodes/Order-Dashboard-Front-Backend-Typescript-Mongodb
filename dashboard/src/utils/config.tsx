import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "localhost:8800/api"
})