import makeAutoObservable from "mobx-store-inheritance";
import { CrudFormStore } from "../../core/store/base_store";
import { {{ name.pascalCase() }}HttpRepository } from "./{{name.snakeCase()}}_http_repository";
import { {{ name.pascalCase() }}Model } from "./{{name.snakeCase()}}_model";

export class {{ name.pascalCase() }}Store extends CrudFormStore<{{ name.pascalCase() }}Model, {{ name.pascalCase() }}HttpRepository> {
    repository: {{ name.pascalCase() }}HttpRepository = new {{ name.pascalCase() }}HttpRepository();
    viewModel: {{ name.pascalCase() }}Model = new {{ name.pascalCase() }}Model();
    constructor() {
        super();
        makeAutoObservable(this);
        this.init();
    }
}


 