import { IsString } from "class-validator";
import { ValidationModel } from "../../core/model/validation_model";

export class MachineToolsModel extends ValidationModel {
    @IsString()
    description: string
}
