import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs';
import { PrismaService } from '../prisma/prisma.service';
import { ImageService } from './image.service';

@Controller()
export class ImageController {
    constructor(
        private prisma: PrismaService,
        private imageService: ImageService,
    ) {}
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@UploadedFile() file: Express.Multer.File) {
        return await this.imageService.uploadFile(file);
    }
}
