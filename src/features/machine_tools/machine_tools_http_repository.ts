

import { CrudHttpRepository } from "../../core/repository/http_repository";
import type { MachineToolsModel } from "./machine_tools_model";

export class MachineToolsHttpRepository extends CrudHttpRepository < MachineToolsModel > {
    featurePath: string = '/machine_tools';
}
