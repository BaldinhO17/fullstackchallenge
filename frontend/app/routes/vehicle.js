import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class VehicleRoute extends Route {
    @service store
    model(params) {
        return this.store.findRecord('vehicle', params.vehicle_id);
    }
}
