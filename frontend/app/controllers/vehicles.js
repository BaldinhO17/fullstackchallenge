import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class VehiclesController extends Controller {
    @service vehicle;
    @service modal;
    @service store;
    @service router;

    @action
    loadVehicles() {
        console.log('hehe')
    }

    @action
    async deleteVehicle(id) {
        await this.vehicle.deleteVehicle(id)
    }

    @action
    editVehicles(vehicle) {
        this.vehicle.editVehicle(vehicle)
        this.router.transitionTo('vehicle', vehicle);
    }
}

