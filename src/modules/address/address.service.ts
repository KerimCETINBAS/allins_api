import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AddressService {
    constructor(private prisma: PrismaService) {}

    async getAddressesByUserId(id: string) {
        return await this.prisma.address.findMany({
            where: {
                userId: id,
            },
        });
    }
}
