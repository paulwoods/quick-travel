import apiClient from './apiClient';
import {Address} from '../types/Address';

// Define the address API endpoints
const ENDPOINTS = {
    ADDRESSES: 'http://localhost:8080/api/addresses',
};

// Address service with CRUD operations
export const addressService = {
    // Get all addresses
    getAll: async (): Promise<Address[]> => {
        const response = await apiClient.get(ENDPOINTS.ADDRESSES);
        return response.data;
    },

    // Get a single address by ID
    getById: async (id: number): Promise<Address> => {
        const response = await apiClient.get(`${ENDPOINTS.ADDRESSES}/${id}`);
        return response.data;
    },

    // Create a new address
    create: async (addressData: Omit<Address, 'id'>): Promise<Address> => {
        const response = await apiClient.post(ENDPOINTS.ADDRESSES, addressData);
        return response.data;
    },

    // Update an existing address
    update: async (id: number, addressData: Omit<Address, 'id'>): Promise<Address> => {
        const response = await apiClient.put(`${ENDPOINTS.ADDRESSES}/${id}`, addressData);
        return response.data;
    },

    // Delete an address
    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`${ENDPOINTS.ADDRESSES}/${id}`);
    },
};
