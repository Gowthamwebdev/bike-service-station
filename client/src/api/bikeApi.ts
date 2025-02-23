import apiClient from "./apiClient";

export const getUserBike = async () => {
    try {
      const response = await apiClient.get(`/bikes`);
      return response.data;
    } catch (error) {
      console.error("Error fetching bikes", error);
      return [];
    }
  };

export const addBike = async(bikeData: {
    name: string,
    brand: string,
    engineCapacity: string,
    registrationNumber: string,
}) => {
    try{
        const response = await apiClient.post('/bikes/adbike',bikeData);
        return response.data;
    }
    catch(error){
        console.error("Error adding bike", error);
    }
}