import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {
  constructor(private svc: BookingsService) {}

  @Post()
  async create(@Body() body: any) {
    return this.svc.create(body);
  }

  @Get()
  async list(@Query('skip') skip = '0', @Query('take') take = '20') {
    return this.svc.list(Number(skip), Number(take));
  }

  @Get('today')
  async today() {
    return this.svc.getTodayBookings();
  }

  @Get('user/:userId')
  async userBookings(@Param('userId') userId: string) {
    return this.svc.getUserBookings(userId);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.svc.get(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.svc.update(id, body);
  }

  @Delete(':id')
  async cancel(@Param('id') id: string) {
    return this.svc.cancel(id);
  }
}
