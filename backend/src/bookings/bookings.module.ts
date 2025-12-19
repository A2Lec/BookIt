import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';

@Module({
  imports: [PrismaModule],
  providers: [BookingsService],
  controllers: [BookingsController],
})
export class BookingsModule {}
