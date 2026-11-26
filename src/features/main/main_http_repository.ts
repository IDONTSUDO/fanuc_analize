

import { CrudHttpRepository } from "../../core/repository/http_repository";
import type { MainModel } from "./main_model";

export class MainHttpRepository extends CrudHttpRepository < MainModel > {
    featurePath: string = '/main';
}
