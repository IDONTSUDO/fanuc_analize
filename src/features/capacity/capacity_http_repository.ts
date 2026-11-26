import { CrudHttpRepository } from "../../core/repository/http_repository";
import type { CapacityModel } from "./capacity_model";

export class CapacityHttpRepository extends CrudHttpRepository<CapacityModel> {
    featurePath: string = '/capacity';
}
