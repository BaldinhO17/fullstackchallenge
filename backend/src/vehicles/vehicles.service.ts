import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
import { PrismaRepository } from './repositories/prisma.repository';

@Injectable()
export class VehiclesService {
  constructor(private repository: PrismaRepository) {}

  create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    return this.repository.create(createVehicleDto);
  }

  findAll(skip?: number, take?: number): Promise<Vehicle[]> {
    return this.repository.findAll(skip, take);
  }

  async findOne(id: number): Promise<Vehicle> {
    return this.repository.findOne(id);
  }

  update(id: number, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {
    return this.repository.update(id, updateVehicleDto);
  }

  remove(id: number): Promise<Vehicle> {
    return this.repository.remove(id);
  }
}
