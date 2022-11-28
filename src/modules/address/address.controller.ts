import { Controller, Get, UseGuards } from '@nestjs/common';
import { IJwtPayload } from 'src/interfaces/JwtPayload';
import { GetUser } from 'src/util/userId.decarotor';
import { JwtAccessGuard } from '../auth/guards/jwt.access.guard';
import { AddressService } from './address.service';

@Controller()
export class AddressController {
    constructor(private addressService: AddressService) {}
    @UseGuards(JwtAccessGuard)
    @Get('address/me')
    getAddressesByUser(@GetUser() user: IJwtPayload) {
        return this.addressService.getAddressesByUserId(user.sub);
    }
}
