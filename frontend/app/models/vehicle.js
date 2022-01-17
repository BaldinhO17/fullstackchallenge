import Model, { attr } from '@ember-data/model';

export default class VehicleModel extends Model {
    @attr('string') type
    @attr('string') license_plate
    @attr('string') brand
    @attr('string') model
    @attr('string') year
}
