import makeAutoObservable from "mobx-store-inheritance";
import { CrudFormStore } from "../../core/store/base_store";
import { CapacityHttpRepository } from "./capacity_http_repository";
import { CapacityModel } from "./capacity_model";

export class CapacityStore extends CrudFormStore<CapacityModel, CapacityHttpRepository> {
    repository: CapacityHttpRepository = new CapacityHttpRepository();
    viewModel: CapacityModel = new CapacityModel();
    constructor() {
        super();
        makeAutoObservable(this);
        this.init();
    }
}
