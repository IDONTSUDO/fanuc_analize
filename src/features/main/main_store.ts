import makeAutoObservable from "mobx-store-inheritance";
import { CrudFormStore } from "../../core/store/base_store";
import { MainHttpRepository } from "./main_http_repository";
import { MainModel } from "./main_model";

export class MainStore extends CrudFormStore<MainModel, MainHttpRepository> {
    repository: MainHttpRepository = new MainHttpRepository();
    viewModel: MainModel = new MainModel();
    constructor() {
        super();
        makeAutoObservable(this);
        this.init();
    }
}


 