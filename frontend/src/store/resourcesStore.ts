import { create } from 'zustand';
import { mockResources } from '../lib/mockData';

interface Resource {
  id: string;
  name: string;
  description?: string;
  category: 'ROOM' | 'EQUIPMENT' | 'VEHICLE' | 'WORKSTATION';
  capacity?: number;
  location?: string;
  status: 'AVAILABLE' | 'MAINTENANCE' | 'OUT_OF_SERVICE';
  features?: Record<string, any>;
}

interface ResourcesStore {
  resources: Resource[];
  addResource: (resource: Resource) => void;
  updateResource: (id: string, resource: Partial<Resource>) => void;
  removeResource: (id: string) => void;
  getResource: (id: string) => Resource | undefined;
  filterByCategory: (category: string) => Resource[];
}

export const useResourcesStore = create<ResourcesStore>((set, get) => ({
  resources: mockResources,

  addResource: (resource) => {
    set((state) => ({
      resources: [...state.resources, resource],
    }));
  },

  updateResource: (id, updates) => {
    set((state) => ({
      resources: state.resources.map((r) => (r.id === id ? { ...r, ...updates } : r)),
    }));
  },

  removeResource: (id) => {
    set((state) => ({
      resources: state.resources.filter((r) => r.id !== id),
    }));
  },

  getResource: (id) => {
    return get().resources.find((r) => r.id === id);
  },

  filterByCategory: (category) => {
    return get().resources.filter((r) => r.category === category);
  },
}));
