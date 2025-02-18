import apiClient from "@/src/api/apiClient";

export const logout = async() =>{
    try{
        await apiClient.post('auth/logout');
        window.location.reload();
    }
    catch(error){
        console.error("Logout failed",error);
    }
}