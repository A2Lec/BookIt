import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  // Vérifier les conflits de réservation
  async checkConflict(resourceId: string, startTime: Date, endTime: Date, excludeId?: string): Promise<boolean> {
    const conflicts = await this.prisma.booking.findMany({
      where: {
        resourceId,
        status: { not: 'CANCELLED' },
        AND: [
          { startTime: { lt: endTime } },
          { endTime: { gt: startTime } },
        ],
        ...(excludeId && { id: { not: excludeId } }),
      },
    });
    return conflicts.length > 0;
  }

  // Créer une réservation
  async create(data: {
    resourceId: string;
    userId: string;
    startTime: Date;
    endTime: Date;
    title: string;
    notes?: string;
    isRecurring?: boolean;
    recurrenceRule?: string;
  }) {
    const conflict = await this.checkConflict(data.resourceId, data.startTime, data.endTime);
    if (conflict) {
      throw new ConflictException('Resource already booked during this time');
    }

    return this.prisma.booking.create({ data: data as any });
  }

  // Lister les réservations (avec pagination)
  async list(skip = 0, take = 20, filters?: any) {
    return this.prisma.booking.findMany({
      where: filters || {},
      skip,
      take,
      include: { resource: true, user: true },
    });
  }

  // Obtenir une réservation
  async get(id: string) {
    return this.prisma.booking.findUnique({
      where: { id },
      include: { resource: true, user: true },
    });
  }

  // Mettre à jour une réservation
  async update(id: string, data: any) {
    const booking = await this.get(id);
    if (!booking) throw new Error('Booking not found');

    // Si dates changées, vérifier les conflits
    if (data.startTime || data.endTime) {
      const start = data.startTime || booking.startTime;
      const end = data.endTime || booking.endTime;
      const conflict = await this.checkConflict(booking.resourceId, start, end, id);
      if (conflict) {
        throw new ConflictException('Resource already booked during this time');
      }
    }

    return this.prisma.booking.update({ where: { id }, data });
  }

  // Annuler une réservation
  async cancel(id: string) {
    return this.prisma.booking.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });
  }

  // Récupérer les réservations d'un utilisateur
  async getUserBookings(userId: string) {
    return this.prisma.booking.findMany({
      where: { userId, status: { not: 'CANCELLED' } },
      include: { resource: true },
      orderBy: { startTime: 'asc' },
    });
  }

  // Récupérer les réservations du jour
  async getTodayBookings() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return this.prisma.booking.findMany({
      where: {
        status: 'CONFIRMED',
        startTime: { gte: today, lt: tomorrow },
      },
      include: { resource: true, user: true },
    });
  }
}
