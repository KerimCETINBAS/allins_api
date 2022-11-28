import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UseInterceptors,
} from '@nestjs/common';
import { MenuCreateDto } from 'src/dto/menu.dto';
import { MenuService } from './menu.service';

@Controller()
export class MenuController {
    constructor(private menuService: MenuService) {}
    @Post('menu')
    addMenu(@Body() body: MenuCreateDto) {
        return this.menuService.addMenu({
            data: {
                name: body.name,
                image: { connect: { id: body.image } },
            },
        });
    }

    @Get('menu')
    async getAllMenu() {
        return await this.menuService.getAllMenu();
    }

    @Delete('menu/:id')
    async deleteMenuById(@Param('id') id: number) {
        try {
            return await this.menuService.deleteMenu(Number(id));
        } catch (error) {}
    }
}
