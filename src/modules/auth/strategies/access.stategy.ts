import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IJwtPayload } from 'src/interfaces/JwtPayload';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
    Strategy,
    'jwt-access',
) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow('JWT_ACCESS_SECRET'),
        });
    }

    async validate(payload: IJwtPayload) {
        return payload;
    }
}
