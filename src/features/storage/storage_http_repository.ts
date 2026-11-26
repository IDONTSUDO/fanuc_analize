import { CrudHttpRepository, HttpMethod } from "../../core/repository/http_repository";
import type { StorageModel } from "./storage_model";

export class StorageHttpRepository extends CrudHttpRepository<StorageModel> {
    featurePath: string = '/storage';

    // создание без формы склада: например, новое сырьё прямо из мастера планирования
    createItem = (item: Pick<StorageModel, "name" | "unitsOfMeasurement"> & Partial<StorageModel>) =>
        this._jsonRequest<StorageModel & { id: number }>(HttpMethod.POST, '/create/new' + this.featurePath, {
            currentBalance: 0,
            actualBalance: 0,
            unitCost: 0,
            ...item,
        });
}
