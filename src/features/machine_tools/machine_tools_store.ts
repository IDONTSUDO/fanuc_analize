import makeAutoObservable from "mobx-store-inheritance";
import { CrudFormStore } from "../../core/store/base_store";
import { MachineToolsHttpRepository } from "./machine_tools_http_repository";
import { MachineToolsModel } from "./machine_tools_model";

export class MachineToolsStore extends CrudFormStore<MachineToolsModel, MachineToolsHttpRepository> {
    repository: MachineToolsHttpRepository = new MachineToolsHttpRepository();
    viewModel: MachineToolsModel = new MachineToolsModel();
    constructor() {
        super();
        makeAutoObservable(this);
        this.init();
    }
}


 