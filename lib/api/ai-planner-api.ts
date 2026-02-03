import api from './axios';
import { Trip, GenerateTripParams } from '../../types/ai-planner/trip.types';

export const aiPlannerApi = {
  generateTrip: async (params: GenerateTripParams): Promise<Trip> => {
    return api.post('/ai-planner/generate', params, {
      timeout: 120000, // 120 seconds for AI generation
    });
  },

  getUserTrips: async (): Promise<Trip[]> => {
    const response = await api.get('/ai-planner/trips');
    return response.data;
  },

  getTrip: async (id: string): Promise<Trip> => {
    const response = await api.get(`/ai-planner/trips/${id}`);
    return response.data;
  },

  deleteTrip: async (id: string): Promise<{ success: boolean }> => {
    const response = await api.delete(`/ai-planner/trips/${id}`);
    return response.data;
  },
};
