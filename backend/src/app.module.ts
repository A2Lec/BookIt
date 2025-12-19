import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ResourcesModule } from './resources/resources.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, ResourcesModule, BookingsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
