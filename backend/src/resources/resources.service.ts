import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ResourcesService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.resource.create({ data });
  }

  async list(skip = 0, take = 20) {
    return this.prisma.resource.findMany({ skip, take });
  }

  async get(id: string) {
    return this.prisma.resource.findUnique({ where: { id } });
  }

  async update(id: string, data: any) {
    return this.prisma.resource.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.resource.delete({ where: { id } });
  }
}
