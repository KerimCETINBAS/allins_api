import {
    Controller,
    Post,
    UseGuards,
    Request,
    Body,
    Res,
    Get,
    UnauthorizedException,
    Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from 'src/dto/login.dto';
import { RegisterCustomerDto } from 'src/dto/user.dto';
import { IJwtPayload } from 'src/interfaces/JwtPayload';
import { GetUser } from 'src/util/userId.decarotor';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { JwtAccessGuard } from './guards/jwt.access.guard';
import { stripProperties } from '../../util/stripProperties';
import { JwtRefreshGuard } from './guards/jwt.refresh.guard';
import { TokenDto } from 'src/dto/token.dto';
import { MailService } from '../mail/mail.service';
import { compare } from 'bcrypt';
@Controller()
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService,
        private mailService: MailService,
    ) {}
    @Post('auth/login')
    async login(@Body() body: LoginDto, @Res() res) {
        try {
            const user = await this.userService.findOneUser({
                where: {
                    OR: [{ email: body.email }, { phone: body.email }],
                },
                select: {
                    id: true,
                    email: true,
                    role: true,
                    isVerified: true,
                    password: true,
                },
            });

            console.log(user);

            console.log(await compare(body.password, user.password));
            if (!(await compare(body.password, user.password)))
                throw new UnauthorizedException({
                    message: 'user is not verified',
                });
            console.log(
                'hersy yolunda',
                await this.authService.createAccessToken(user),
            );
            return res.status(200).json({
                accessToken: await this.authService.createAccessToken(user),
                refreshToken: await this.authService.createRefreshToken(user),
            });
        } catch (error) {
            console.log(error);
        }
    }

    @Post('auth/register')
    async register(@Body() body: RegisterCustomerDto) {
        try {
            const user = await this.authService.registerCustomer(body);
            const mail = await this.mailService.sendMail('verifyTeplate', {
                from: 'register@allins.com.tr',
                to: user.email,
                subject: 'Dogrulama',
                text: 'Dogrulama kodunuz, ' + user.totpToken,
                payload: { name: user.firstName, token: user.totpToken },
            });
            return user;
        } catch (error) {
            console.log(error);
        }
    }
    @UseGuards(JwtAccessGuard)
    @Get('auth/me')
    async getCurrentUser(@GetUser() user: IJwtPayload) {
        const body = stripProperties(
            user as unknown as { [key: string]: unknown },
            ['iat', 'exp'],
        );

        return {
            ...body,
        };
    }

    @UseGuards(JwtRefreshGuard)
    @Get('auth/refresh')
    async userRefreshToken(@GetUser() user: IJwtPayload) {
        const invalidateToken = await this.authService.invalidateToken(
            user.sub,
        );

        if (invalidateToken.user.email !== user.email) {
            console.log('Token hirsizligi');

            throw new UnauthorizedException();
        }

        return {
            accessToken: await this.authService.createAccessToken(
                invalidateToken.user,
            ),
            refreshToken: await this.authService.createRefreshToken(
                invalidateToken.user,
            ),
        };
    }

    @Patch('auth/verify')
    async verifyUser(@Body() body: TokenDto) {
        try {
            const isVerified = await this.userService.findOneUser({
                where: {
                    isVerified: true,
                    totpToken: body.token,
                },
            });
            if (isVerified && isVerified.isVerified) {
                return {
                    message: 'Kullanici zaten dogrulanmis',
                    verified: false,
                };
            }
            const verified = await this.userService.updateUser({
                where: {
                    totpToken: body.token,
                },
                data: {
                    isVerified: true,
                },
            });

            return {
                verified: true,
            };
        } catch (error) {
            return {
                verified: false,
                message: 'Kullanici bulunamadi',
            };
        }
    }
}
