import { Injectable } from '@nestjs/common';
import { PrismaProvider } from 'src/providers/prisma.provider';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';
import { IVehicleRepository } from './IVehicle.reposiory';

@Injectable()
export class PrismaRepository implements IVehicleRepository {
  constructor(private prisma: PrismaProvider) {}

  create(data: CreateVehicleDto) {
    return this.prisma.vehicle.create({
      data,
    });
  }

  findAll(skip?: number, take?: number) {
    return this.prisma.vehicle.findMany({
      orderBy: {
        id: "asc"
      },
      skip,
      take,
    });
    
  }

  async findOne(id: number) {
    return this.prisma.vehicle.findUnique({
      where: {
        id,
      },
    })
  }

  update(id: number, data: UpdateVehicleDto) {
    return this.prisma.vehicle.update({
      data,
      where: {
        id
      },
    });
  }

  remove(id: number) {
    return this.prisma.vehicle.delete({
      where:{
        id
      }
    });
  }
}
