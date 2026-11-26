import { IsNumber, IsOptional, IsString } from "class-validator";
import { ValidationModel } from "../../core/model/validation_model";

export class CapacityModel extends ValidationModel {
    id?: number;
    @IsString({ message: 'Поле название является обязательным' })
    name: string;
    @IsString({ message: 'Выберите тип ресурса' })
    resourceType: string;
    @IsNumber({}, { message: 'Поле количество является обязательным' })
    count: number;
    @IsNumber({}, { message: 'Поле длительность смены является обязательным' })
    hoursPerShift: number;
    @IsNumber({}, { message: 'Поле смен в день является обязательным' })
    shiftsPerDay: number;
    @IsOptional()
    @IsNumber({}, { message: 'Стоимость часа должна быть числом' })
    costPerHour?: number;
}
