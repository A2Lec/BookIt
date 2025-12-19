import { create } from 'zustand';
import { mockBookings } from '../lib/mockData';

interface Booking {
  id: string;
  resourceId: string;
  userId: string;
  title: string;
  startTime: string;
  endTime: string;
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
  isRecurring: boolean;
}

interface BookingsStore {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  updateBooking: (id: string, booking: Partial<Booking>) => void;
  removeBooking: (id: string) => void;
  getBookingsByUser: (userId: string) => Booking[];
  getBookingsByResource: (resourceId: string) => Booking[];
  getTodayBookings: () => Booking[];
  hasConflict: (resourceId: string, startTime: string, endTime: string) => boolean;
}

export const useBookingsStore = create<BookingsStore>((set, get) => ({
  bookings: mockBookings,

  addBooking: (booking) => {
    set((state) => ({
      bookings: [...state.bookings, booking],
    }));
  },

  updateBooking: (id, updates) => {
    set((state) => ({
      bookings: state.bookings.map((b) => (b.id === id ? { ...b, ...updates } : b)),
    }));
  },

  removeBooking: (id) => {
    set((state) => ({
      bookings: state.bookings.filter((b) => b.id !== id),
    }));
  },

  getBookingsByUser: (userId) => {
    return get().bookings.filter((b) => b.userId === userId && b.status !== 'CANCELLED');
  },

  getBookingsByResource: (resourceId) => {
    return get().bookings.filter((b) => b.resourceId === resourceId && b.status !== 'CANCELLED');
  },

  getTodayBookings: () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return get().bookings.filter((b) => {
      const start = new Date(b.startTime);
      return start >= today && start < tomorrow && b.status === 'CONFIRMED';
    });
  },

  hasConflict: (resourceId, startTime, endTime) => {
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();

    return get().bookings.some((b) => {
      if (b.resourceId !== resourceId || b.status === 'CANCELLED') return false;
      const bStart = new Date(b.startTime).getTime();
      const bEnd = new Date(b.endTime).getTime();
      return bStart < end && bEnd > start;
    });
  },
}));
