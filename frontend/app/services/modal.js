import Service, { inject } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ModalService extends Service {
    @inject vehicle

    @tracked
    isCreateVehicleOpen = false

    @action
    openCreateVehicle() {
        if (this.type) this.vehicle.getBrands() 
        this.isCreateVehicleOpen = true
    }

    @action
    closeCreateVehicle() {
        this.isCreateVehicleOpen = false
    }
}
