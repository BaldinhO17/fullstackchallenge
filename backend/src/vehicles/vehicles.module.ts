import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { PrismaProvider } from 'src/providers/prisma.provider';
import { IVehicleRepository } from './repositories/IVehicle.reposiory';
import { PrismaRepository } from './repositories/prisma.repository';

@Module({
  imports: [],
  controllers: [VehiclesController],
  providers: [VehiclesService, PrismaRepository, PrismaProvider]
})
export class VehiclesModule {}
