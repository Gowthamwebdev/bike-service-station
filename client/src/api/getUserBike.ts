import apiClient from "./apiClient";

export const getUserBike = async (userId: any) => {
    try{
        const response = await apiClient.get('/bikes');
        return response.data;
        
    }
    catch(error){
        console.error("error fetching bikes", error);
        return [];
    }
}