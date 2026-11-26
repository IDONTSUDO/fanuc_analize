import { IsNumber, IsString } from "class-validator";
import { ValidationModel } from "../../core/model/validation_model";

export class StorageModel extends ValidationModel {
    @IsNumber({}, { message: 'Поле текущий баланс является обязательным' })
    currentBalance: number;
    @IsNumber({}, { message: 'Поле актуальный баланс является обязательным' })
    actualBalance: number;
    @IsString({ message: 'Поле название ялвяется обяазательным' })
    name: string;
    @IsNumber({}, { message: 'Поле себе стоймость за единицу измерения является обязательным' })
    unitCost: number;
    @IsString({ message: 'Поле единицы измерения ялвяется обяазательным' })
    unitsOfMeasurement: string
}
    