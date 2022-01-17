import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class VehicleController extends Controller {
    @service router;
    @service vehicle;

    @action
    updateVehicle(e) {
        e.preventDefault();
        this.vehicle.updateVehicle()
        this.router.transitionTo('vehicles');
    }
}
