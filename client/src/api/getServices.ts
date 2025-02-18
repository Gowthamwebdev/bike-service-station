import apiClient from './apiClient';

export const viewServices = async () => {
    try {
        const response = await apiClient.get('/services');
        return response.data;
    } catch (error) {
        console.error('Error fetching services:', error);
        return [];
    }
};
