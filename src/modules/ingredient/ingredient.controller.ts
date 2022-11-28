import { Body, Controller, Get, Post } from '@nestjs/common';
import { Prisma } from '.prisma/client';
import { IngredientCreateDto } from 'src/dto/ingredient.dto';
import { IngredientService } from './ingredient.service';

@Controller()
export class IngredientController {
    constructor(private ingredientService: IngredientService) {}
    @Post('ingredient')
    async createIngredient(@Body() body: IngredientCreateDto) {
        return this.ingredientService.createIngredient({
            data: body,
        });
    }

    @Get('ingredient')
    async getAllIngredients() {
        return this.ingredientService.getAllIngredients();
    }
}
