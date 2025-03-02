import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.NEXT_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        //  Authorization: `${localStorage.getItem("token")}`
    },
    withCredentials: true,
})

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Api error: ' + error);
        return Promise.reject(error);
    }
);

export default apiClient;