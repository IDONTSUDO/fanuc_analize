import { IsString } from "class-validator";
import { ValidationModel } from "../../core/model/validation_model";

export class {{ name.pascalCase() }}Model extends ValidationModel {
    @IsString()
    description: string
}
