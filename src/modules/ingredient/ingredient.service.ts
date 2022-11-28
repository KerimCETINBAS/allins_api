import { Injectable } from '@nestjs/common';
import { Prisma } from '.prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class IngredientService {
    constructor(private prismaService: PrismaService) {}

    async createIngredient(input: Prisma.IngredientCreateArgs) {
        return this.prismaService.ingredient.create(input);
    }

    async getAllIngredients() {
        return this.prismaService.ingredient.findMany({
            include: {
                usedByProduct: true,
                usedByProductAsExtra: true,
            },
        });
    }
}
