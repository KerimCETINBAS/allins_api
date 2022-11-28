import { DynamicModule, Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';

import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy } from './strategies/access.stategy';
import { JwtRefreshStrategy } from './strategies/refhres.strategy';

@Global()
@Module({
    imports: [PassportModule, UserModule, JwtModule.register({})],
    controllers: [AuthController],
    providers: [
        AuthService,
        UserService,
        JwtAccessStrategy,
        JwtRefreshStrategy,
    ],
    exports: [AuthService, UserService],
})
export class AuthModule {
    // static forRoot(): DynamicModule {
    //     return {
    //         imports: [
    //             PassportModule,
    //             UserModule,
    //             JwtModule.register({}),
    //             LocalStrategy,
    //         ],
    //         module: AuthModule,
    //         controllers: [AuthController],
    //         providers: [
    //             AuthService,
    //             UserService,
    //             LocalStrategy,
    //             JwtAccessStrategy,
    //         ],
    //         exports: [AuthService, LocalStrategy],
    //         global: true,
    //     };
    // }
}
