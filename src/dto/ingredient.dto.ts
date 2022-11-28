import { Type } from 'class-transformer';
import {
    IsNotEmpty,
    IsNumber,
    IsString,
    ValidateNested,
} from 'class-validator';

export class IngredientCreateDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    stock: number;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsString()
    description: string;
}

export class IngredientConnectDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;
}

export class IngredientConnectArrayDto {
    @ValidateNested({ each: true })
    @Type(() => IngredientConnectDto)
    connnect: IngredientConnectDto[];
}

export class IngredientConnectOrDisconnectArrayDto {
    @ValidateNested({ each: true })
    @Type(() => IngredientConnectDto)
    connnect: IngredientConnectDto[];

    @ValidateNested({ each: true })
    @Type(() => IngredientConnectDto)
    disconnect: IngredientConnectDto[];
}
