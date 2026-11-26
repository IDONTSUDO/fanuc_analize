

import { CrudHttpRepository } from "../../core/repository/http_repository";
import type { {{ name.pascalCase() }}Model } from "./{{name.snakeCase()}}_model";

export class {{ name.pascalCase() }}HttpRepository extends CrudHttpRepository < {{ name.pascalCase() }}Model > {
    featurePath: string = '/{{name.snakeCase()}}';
}
