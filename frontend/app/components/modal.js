import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ModalComponent extends Component {
    @service store
    @service vehicle
    @service modal

    @action
    async submitModal(e) {
        e.preventDefault();
        this.vehicle.createVheicle()
        this.modal.closeCreateVehicle()
    }
}
