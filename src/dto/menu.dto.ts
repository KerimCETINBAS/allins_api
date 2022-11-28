import { IsNotEmpty, IsString } from 'class-validator';

export class MenuCreateDto {
    @IsString()
    @IsNotEmpty()
    name?: string;

    @IsString()
    image?: string;
}
