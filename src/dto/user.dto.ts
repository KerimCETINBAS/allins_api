import { Type } from 'class-transformer';
import {
    IsArray,
    IsDefined,
    IsEmail,
    IsMobilePhone,
    IsNotEmpty,
    IsNotEmptyObject,
    IsObject,
    IsPhoneNumber,
    isPhoneNumber,
    IsString,
    ValidateNested,
} from 'class-validator';
import { AddressDto } from './address.dto';

export class RegisterCustomerDto {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsObject()
    @Type(() => AddressDto)
    address: AddressDto;

    @IsString()
    @IsNotEmpty()
    password: string;
}
