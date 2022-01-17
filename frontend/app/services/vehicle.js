import Service, { inject } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';

export default class VehicleService extends Service {
    @inject store

    @tracked
    id = ''
    @tracked
    license_plate = ''
    @tracked
    brand = ''
    @tracked
    model = ''
    @tracked
    year = ''
    @tracked
    type = ''

    @tracked
    vehicles = this.retriveVehicles()

    @tracked
    types = [
        {
            codigo: "carros",
            nome: "Carro"
        },
        {
            codigo: "motos",
            nome: "Moto"
        },
        {
            codigo: "caminhoes",
            nome: "Caminhão"
        }
    ]
    @tracked
    brands = []
    @tracked
    models = []
    @tracked
    years = []

    @tracked
    selectedType = null
    @tracked
    selectedBrand = null
    @tracked
    selectedModel = null
    @tracked
    selectedYear = null

    fipeBaseUrl = "https://parallelum.com.br/fipe/api/v1"


    async updateVehicle() {
        let vehicle = this.store.findRecord('vehicle', this.id).then(record=>{
            record.license_plate = this.license_plate
            record.brand = this.brand
            record.model = this.model
            record.year = this.year
            record.type = this.type
            record.save()
        })
    }

    async editVehicle(vehicle) {
        this.id = vehicle.get('id')
        this.license_plate = vehicle.get('license_plate')
        this.brand = vehicle.get('brand')
        this.model = vehicle.get('model')
        this.year = vehicle.get('year')
        this.type = vehicle.get('type')
        this.selectedType = this.types.find(type => type.nome == this.type).codigo
        await this.getBrands()
        this.selectedBrand = this.brands.find(brand => brand.nome == this.brand).codigo
        await this.getModels()
        this.selectedModel = this.models.find(model => model.nome == this.model).codigo
        await this.getYears()
        this.selectedYear = this.years.find(year => year.nome == this.year).codigo
    }

    async deleteVehicle(id) {
        try {
            let vehicle = this.store.peekRecord('vehicle', id);
            vehicle.deleteRecord();
            await vehicle.save();
            this.loadVehicles();
            return true
        } catch (error) {
            console.log(error)
            this.retriveVehicles()
            return false
        }
    }

    async createVheicle() {
        try {
            let vehicle = await this.store.createRecord('vehicle', {
                license_plate: this.license_plate,
                brand: this.brand,
                model: this.model,
                year: this.year,
                type: this.type
            })
            
            await vehicle.save();
            this.loadVehicles()
            return true
        } catch (error) {
            console.log(error)
            this.retriveVehicles()
            return false
        }
    }

    retriveVehicles() {
        console.log('veio aq')
        return this.store.findAll('vehicle')
            .then((response) => {
                console.log(response)
                this.vehicles = response
                console.log(this.vehicles)
            }).catch(err=>console.error(err))
        
    }

    loadVehicles() {
        this.vehicles = this.store.peekAll('vehicle')
    }


    @action
    async getBrands() {
        await fetch(`${this.fipeBaseUrl}/${this.selectedType}/marcas`)
        .then((response)=> response.json() )
        .then((data) => this.brands = data)
        .catch((error)=>console.log(error))
    }

    @action
    async getModels() {
        await fetch(`${this.fipeBaseUrl}/${this.selectedType}/marcas/${this.selectedBrand}/modelos`)
        .then((response)=> response.json() )
        .then((data) => this.models = data.modelos)
        .catch((error)=>console.log(error))
    }

    @action
    async getYears() {
        await fetch(`${this.fipeBaseUrl}/${this.selectedType}/marcas/${this.selectedBrand}/modelos/${this.selectedModel}/anos`)
        .then((response)=> response.json() )
        .then((data) => this.years = data)
        .catch((error)=>console.log(error))
    }

    @action
    selectType(e) {
        this.selectedType = e.target.value
        this.type = this.types.find(type => type.codigo == e.target.value).nome || ''
        this.getBrands()
    }

    @action
    selectBrand(e) {
        this.selectedBrand = e.target.value
        this.brand = this.brands.find(brand => brand.codigo == e.target.value).nome || ''
        this.getModels()
    }

    @action
    selectModel(e) {
        this.selectedModel = e.target.value
        this.model = this.models.find(model => model.codigo == e.target.value).nome || ''
        this.getYears()
    }

    @action
    selectYear(e) {
        this.selectedYear = e.target.value
        this.year = this.years.find(year => year.codigo == e.target.value).nome || ''
    }

}

