import { Vehicle } from "../entities/vehicle.entity"
import { CreateVehicleDto } from "../dto/create-vehicle.dto"
import { UpdateVehicleDto } from "../dto/update-vehicle.dto"

export interface IVehicleRepository {
    create(vehicleDto: CreateVehicleDto): Promise<Vehicle>
    findAll(skip?: number, take?: number): Promise<Vehicle[]>
    findOne(id: number): Promise<Vehicle>
    update(id: number, vehicleDto: UpdateVehicleDto): Promise<Vehicle>
    remove(id: number): Promise<Vehicle>
}