import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '.prisma/client';
import { RegisterCustomerDto } from 'src/dto/user.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async findUniqueUser(input: {
        where: Prisma.UserWhereUniqueInput;
        select?: Prisma.UserSelect;
    }): Promise<User | null> {
        return this.prisma.user.findUnique(input);
    }
    async findOneUser(userInput: {
        select?: Prisma.UserSelect;
        include?: Prisma.UserInclude;
        where?: Prisma.UserWhereInput;
    }) {
        return this.prisma.user.findFirst(userInput);
    }

    async findAllUsers(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }): Promise<User[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createUser(data: Prisma.UserCreateInput): Promise<Partial<User>> {
        return this.prisma.user.create({
            data,
            select: {
                id: true,
                email: true,
                firstName: true,
                totpToken: true,
            },
        });
    }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<User> {
        const { where, data } = params;
        return this.prisma.user.update({
            data,
            where,
        });
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prisma.user.delete({
            where,
        });
    }
}
