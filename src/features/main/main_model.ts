import { IsString } from "class-validator";
import { ValidationModel } from "../../core/model/validation_model";

export class MainModel extends ValidationModel {
    @IsString()
    description: string
}
