import makeAutoObservable from "mobx-store-inheritance";
import { CrudFormStore } from "../../core/store/base_store";
import { StorageHttpRepository } from "./storage_http_repository";
import { StorageModel } from "./storage_model";

export class StorageStore extends CrudFormStore<StorageModel, StorageHttpRepository> {
    repository: StorageHttpRepository = new StorageHttpRepository();
    viewModel: StorageModel = new StorageModel();
    constructor() {
        super();
        makeAutoObservable(this);
        this.init();
    }
}


