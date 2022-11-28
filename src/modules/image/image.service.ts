import { Injectable } from '@nestjs/common';
import { Prisma } from '.prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { createWriteStream } from 'fs';
import * as path from 'path';

@Injectable()
export class ImageService {
    constructor(private prisma: PrismaService) {}
    async uploadFile(file: Express.Multer.File) {
        console.log(file);
        let uploaded = await this.prisma.image.create({
            data: {
                alt: file.originalname,
            } as Prisma.ImageCreateInput,
        });

        const src =
            uploaded.id + '.' + file.originalname.match(/(?<=\.)(.+)(?=$)/i)[0];
        uploaded.src = src;

        uploaded = await this.prisma.image.update({
            where: { id: uploaded.id },
            data: uploaded,
        });

        const stream = createWriteStream(
            path.resolve(process.cwd(), 'public', src),
        );

        stream.write(file.buffer);

        return uploaded;
    }
}
