import apiClient from "@/src/api/apiClient";
import { useRouter } from "next/navigation";
export const logout = async(router: ReturnType<typeof useRouter>) =>{
    try{
        await apiClient.post('auth/logout');
        window.location.reload();
    }
    catch(error){
        console.error("Logout failed",error);
    }
}