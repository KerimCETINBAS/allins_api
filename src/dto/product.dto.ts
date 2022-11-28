import { Type } from 'class-transformer';
import {
    IsArray,
    IsDefined,
    IsEmail,
    IsNumber,
    IsObject,
    IsString,
    ValidateNested,
} from 'class-validator';
import {
    IngredientConnectArrayDto,
    IngredientConnectDto,
    IngredientConnectOrDisconnectArrayDto,
} from './ingredient.dto';

export class ProductCreateDto {
    @IsString()
    name: string;

    @IsNumber({}, { each: true })
    stock: number;

    @IsString()
    description: string;

    @IsNumber()
    price: number;

    @IsObject()
    ingredients: {
        connect: IngredientConnectDto[];
    };

    @IsObject()
    @ValidateNested()
    extraIngredients: IngredientConnectArrayDto;
}

export class ProductUpdateIngredientsDto {
    @IsString()
    name: string;

    @IsNumber({}, { each: true })
    stock: number;

    @IsString()
    description: string;

    @IsNumber()
    price: number;

    @IsObject()
    @Type(() => IngredientConnectOrDisconnectArrayDto)
    ingredients: IngredientConnectOrDisconnectArrayDto;
}
