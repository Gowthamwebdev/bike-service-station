import apiClient from "./apiClient";
import { bookingType } from "../types/bookingType";
import toast from "react-hot-toast";

export const getBookings = async () => {
  try {
    const response = await apiClient.get('/bookings');
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

export const addBooking = async (bookingData: bookingType) => {
  try {
    const response = await apiClient.post("/bookings/new", bookingData);
    return response.data;
  } catch (error) {
    console.error("Error adding booking:", error);
    throw error;
  }
};

export const cancelPendingBooking = async (bookingId: string) => {
  try {
    const response = await toast.promise(
      apiClient.delete(`/bookings/${bookingId}`),
      {
        loading: "Canceling booking...",
        success: "Booking canceled successfully!",
        error: "Failed to cancel booking.",
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error canceling booking:", error.message);
    throw error;
  }
};