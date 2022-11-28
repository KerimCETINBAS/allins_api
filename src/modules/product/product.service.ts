import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '.prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) {}

    async createProduct(
        input: Prisma.ProductCreateArgs,
    ): Promise<Partial<Product>> {
        return this.prisma.product.create(input);
    }

    async getAllProduct() {
        return this.prisma.product.findMany({
            include: {
                extraIngredients: true,
                ingredients: true,
            },
        });
    }

    async addIngredientToProduct(input: Prisma.ProductUpdateArgs) {
        return await this.prisma.product.update(input);
    }

    async deleteProduct(input: Prisma.ProductWhereUniqueInput) {
        return await this.prisma.product.delete({ where: input });
    }
}
