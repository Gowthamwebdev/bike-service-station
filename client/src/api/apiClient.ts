import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 5000,
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