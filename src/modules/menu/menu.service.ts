import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '.prisma/client';
@Injectable()
export class MenuService {
    constructor(private prisma: PrismaService) {}

    async addMenu(input: Prisma.MenuCreateArgs) {
        return await this.prisma.menu.create(input);
    }

    async getAllMenu() {
        return await this.prisma.menu.findMany({
            select: {
                name: true,
                products: {
                    select: {
                        name: true,
                        id: true,
                    },
                },
                image: {
                    select: {
                        src: true,
                        alt: true,
                    },
                },
            },
        });
    }

    async deleteMenu(id: number) {
        return await this.prisma.menu.delete({
            where: {
                id,
            },
        });
    }
}
