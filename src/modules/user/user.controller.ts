import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { IJwtPayload } from 'src/interfaces/JwtPayload';
import { GetUser } from 'src/util/userId.decarotor';
import { JwtAccessGuard } from '../auth/guards/jwt.access.guard';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(private userService: UserService) {}
    @UseGuards(JwtAccessGuard)
    @Get('users')
    async getUsers() {
        console.log('Users');
        return this.userService.findAllUsers({});
    }

    @Delete('user/:id')
    async deleteUser(@Param('id') id: string) {
        this.userService.deleteUser({ id });
    }
    @UseGuards(JwtAccessGuard)
    @Get('user/me')
    async getMyData(@GetUser() user: IJwtPayload) {
        return this.userService.findOneUser({
            where: {
                id: user.sub,
            },
            select: {
                firstName: true,
                address: true,
                lastName: true,
                email: true,
                phone: true,
            },
        });
    }
}
