import { bikeType } from "../types/bikeType";
import apiClient from "./apiClient";

export const getUserBikes = async () => {
    try {
      const response = await apiClient.get(`/bikes`);
      return response.data;
    } catch (error) {
      console.error("Error fetching bikes", error);
      return [];
    }
  };

export const getUserBike = async(bikeId: string) => {
  try{
    const response = await apiClient.get(`/bikes/${bikeId}`);
    return response.data;
  }
  catch(error){
    console.error("Error fetching bike", error);
    throw error;  
  }
}

  export const addBike = async (bikeData: {
    name: string;
    brand: string;
    engineCapacity: string;
    registrationNumber: string;
  }) => {
    try {
      const response = await apiClient.post("/bikes/addbike", bikeData);
      return response.data;
    } catch (error) {
      console.error("Error adding bike", error);
      throw error; // Re-throw the error to handle it in the component
    }
  };

  export const updateBikeById = async(bikeId: string, updatedData: bikeType) =>{
    try{
      const response = await apiClient.put(`/bikes/${bikeId}`,updatedData);
      return response.data;
    }
    catch(error){
      console.error("Error updating bike", error);
      throw error; 
    }
  }

  export const deleteBikeById = async (bikeId: string) => {
    try {
      await apiClient.delete(`/bikes/${bikeId}`);
    } catch (error) {
      console.error("Error deleting bike", error);
    }
  };