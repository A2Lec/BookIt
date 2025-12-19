import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(payload: { email: string; password: string; firstName?: string; lastName?: string }) {
    const existing = await this.usersService.findByEmail(payload.email);
    if (existing) throw new BadRequestException('Email already exists');
    const user = await this.usersService.create(payload as any);
    const token = this.signToken({ sub: user.id, email: user.email, role: user.role });
    return { user, token };
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException('Invalid credentials');
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new BadRequestException('Invalid credentials');
    const token = this.signToken({ sub: user.id, email: user.email, role: user.role });
    return { user, token };
  }

  signToken(payload: object) {
    const secret = process.env.JWT_SECRET || 'devsecret';
    return jwt.sign(payload, secret, { expiresIn: '7d' });
  }
}
