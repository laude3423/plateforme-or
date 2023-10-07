import {
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { AppService } from './app.service';
import { HttpStatus, Res, UseInterceptors } from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';
import { Response } from 'express';

@Controller('example')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/Téléchargements', // Même chemin que dans la configuration MulterModule
        filename: (req, file, callback) => {
          callback(null, file.originalname);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      if (file) {
        // Le fichier a été téléchargé avec succès
        return { filename: file.filename };
      } else {
        console.log('No file uploaded');
        return null;
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new HttpException(
        'Error uploading file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/:filename')
  async getPdfFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = path.join(
      __dirname,
      '..',
      './public/Téléchargements',
      filename,
    );
    try {
      const fileStream = fs.createReadStream(filePath);
      res.setHeader('Content-Type', 'application/pdf');
      fileStream.pipe(res);
    } catch (error) {
      res.status(404).send('File not found');
    }
  }
}
