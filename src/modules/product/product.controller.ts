import {
    Body,
    ConflictException,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    Patch,
    Post,
    Put,
} from '@nestjs/common';
import { Prisma, Product } from '.prisma/client';
import {
    IngredientConnectArrayDto,
    IngredientConnectOrDisconnectArrayDto,
} from 'src/dto/ingredient.dto';
import {
    ProductCreateDto,
    ProductUpdateIngredientsDto,
} from 'src/dto/product.dto';
import { MailService } from '../mail/mail.service';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
    constructor(
        private productService: ProductService,
        private mailService: MailService,
    ) {}

    @Post('product')
    async addProduct(@Body() body: ProductCreateDto) {
        try {
            return await this.productService
                .createProduct({
                    data: {
                        ...body,
                        usedInMenu: {},
                    },
                })
                .catch((e) => console.log(e));
        } catch (error) {
            if (error.code == 'P2002')
                throw new ConflictException(
                    `Product ${body.name} already exist`,
                );
        }
    }

    @Get('product')
    async getAllProduct() {
        return await this.productService.getAllProduct();
    }

    @Patch('product/:id/ingredients')
    async addIngredientToProduct(
        @Body() body: ProductUpdateIngredientsDto,
        @Param('id') id: number,
    ) {
        console.log(body);
        return await this.productService
            .addIngredientToProduct({
                data: {
                    ...body,
                },
                where: { id: Number(id) },
                include: { ingredients: true },
            })
            .then((data) => {
                console.log(data);
                return data;
            });
    }

    @Delete('product/:id')
    async deleteProduct(@Param('id') id: number) {
        return this.productService.deleteProduct({ id: Number(id) });
    }

    @Get('/mail')
    async sendToZibiZeretta() {
        await this.mailService
            .sendMail('verifyTeplate', {
                from: '"Test 👻" <info@allins.com.tr>',
                to: 'zibizeretta@gmail.com',
                subject: 'verify',
                text: '143212342',
                payload: '143212342',
            })
            .then((data) => console.log('send', data))
            .catch((error) => console.log('error', error));
    }
}
