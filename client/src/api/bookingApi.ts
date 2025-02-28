import { bikeType } from "../types/bikeType";
import apiClient from "./apiClient"

export const getBooking = async() => {
    try{
        const response = await apiClient.get('/bookings');
        return response.data;
    }
    catch(error){
        console.error('Error fetching bookings:', error);
        throw error;
    }
}

export const addBooking = async(bikeData: bikeType) => {
    try{
        const booking = await apiClient.post('/bookings/new',{
            bikeData: bikeData
            
        })
    }
    catch(error){
        console.error('Error adding booking:', error);
        throw error;
    }
}