import apiClient from "./apiClient"

export const authStatus = async () => {
    try{
        const response = await apiClient.get('/auth/status');
        return response.data;
    }
    catch(error){
        console.error('auth failed');
    }
}