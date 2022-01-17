import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  async create(@Body() {vehicle}) {
    return {vehicle: await this.vehiclesService.create(vehicle)};
  }

  @Get()
  async findAll(@Query('take') take?: number, @Query('skip') skip?: number) {
    return {vehicles: await this.vehiclesService.findAll(skip, take)};
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {vehicle: await this.vehiclesService.findOne(+id)};
  }

  @Patch(':id')
  async partialUpdate(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return {vehicle: await this.vehiclesService.update(+id, updateVehicleDto)};
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() {vehicle}) {
    return {vehicle: await this.vehiclesService.update(+id, vehicle)};
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(+id);
  }
}
