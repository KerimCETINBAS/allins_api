import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddressDto {
    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    province: string;

    @IsString()
    @IsNotEmpty()
    town: string;

    @IsString()
    @IsNotEmpty()
    street: string;

    @IsString()
    @IsNotEmpty()
    building: string;

    @IsString()
    @IsNotEmpty()
    zip: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    doorNum: string;

    @IsString()
    @IsNotEmpty()
    buildingNum: string;
    @IsString()
    @IsNotEmpty()
    name: string;
}
