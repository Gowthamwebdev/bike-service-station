import apiClient from './apiClient';

export const getServices = async () => {
    try {
        const response = await apiClient.get('/services');
        return response.data;
    } catch (error) {
        console.error('Error fetching services:', error);
        return [];
    }
};
