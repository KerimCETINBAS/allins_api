import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './modules/product/product.module';
import { IngredientModule } from './modules/ingredient/ingredient.module';
import { MailModule } from './modules/mail/mail.module';
import { Prisma } from '.prisma/client';
import { PrismaService } from './modules/prisma/prisma.service';
import { AuthService } from './modules/auth/auth.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AddressModule } from './modules/address/address.module';
import { MenuModule } from './modules/menu/menu.module';
import { ImageModule } from './modules/image/image.module';
@Module({
    imports: [
        AuthModule,
        PrismaModule.forRoot(),
        ConfigModule.forRoot({ isGlobal: true }),
        UserModule,
        ProductModule,
        IngredientModule,
        AddressModule,
        MailModule,
        ImageModule,
        MenuModule,
        ServeStaticModule.forRoot({
            rootPath: join(process.cwd(), 'public'),
        }),
    ],
    controllers: [],
    providers: [],
    exports: [UserModule],
})
export class AppModule {
    constructor(
        private prisma: PrismaService,
        private authService: AuthService,
    ) {
        this.findAdmin();
    }

    async findAdmin() {
        try {
            await this.prisma.user.findFirstOrThrow({
                where: {
                    role: 'ADMIN',
                },
            });
        } catch (error) {
            if (error instanceof Prisma.NotFoundError) {
                await this.prisma.user.create({
                    data: {
                        firstName: 'Allins',
                        lastName: 'Smokehouse',
                        role: 'ADMIN',
                        email: 'admin@allins.com.tr',
                        phone: '',
                        totpToken: '',
                        isVerified: true,
                        password: await this.authService.hashPassword(
                            'All1nsallins',
                        ),
                    },
                });
            }
        }
    }
}
