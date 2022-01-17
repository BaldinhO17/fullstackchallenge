import RESTAdapter from '@ember-data/adapter/rest';

export default class VehicleAdapter extends RESTAdapter {
    host = 'http://localhost:3000'
}
