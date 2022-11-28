import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterCustomerDto } from 'src/dto/user.dto';
import { UserService } from '../user/user.service';
import { hash } from 'bcrypt';
import { Prisma } from '.prisma/client';
import { User } from '.prisma/client';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import * as TOTP from 'totp-generator';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService,
        private prisma: PrismaService,
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        console.log(username, password);
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async hashPassword(password: string): Promise<string> {
        return hash(password, 10);
    }

    async registerCustomer(body: RegisterCustomerDto) {
        const { address, password, ...rest } = body;

        const createUserInput: Prisma.UserCreateInput = {
            ...rest,
            totpToken: await TOTP('JBSWY3DPEHPK3PXP', { digits: 8 }),
            password: await hash(password, 10),
            address: {
                create: {
                    ...address,
                },
            },
        };
        return await this.usersService.createUser({
            ...createUserInput,
        });
    }

    async createAccessToken(user: Partial<User>) {
        console.log(user, 'auth/service/createAccessToken');
        return this.jwtService.sign(
            {
                sub: user.id,
                email: user.email,
                role: user.role,
            },
            {
                secret: this.configService.getOrThrow('JWT_ACCESS_SECRET'),
                expiresIn: '24min',
            },
        );
    }

    async invalidateToken(token: string) {
        return await this.prisma.token.update({
            where: { id: token },
            data: { isValid: false },
            include: { user: true },
        });
    }
    async createRefreshToken(user: Partial<User>) {
        const token = await this.prisma.token.create({
            data: {
                userId: user.id,
            },
            select: { id: true },
        });

        return this.jwtService.sign(
            {
                sub: token.id,
                email: user.email,
            },
            {
                secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
                expiresIn: '1w',
            },
        );
    }
}
