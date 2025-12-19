import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  async me(@Request() req) {
    const id = req.headers['x-user-id'];
    if (!id) return { error: 'no x-user-id header' };
    return this.usersService.findById(id as string);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}
