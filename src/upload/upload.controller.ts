import {
  Controller,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  ParseIntPipe,
  UploadedFiles,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { API_VERSION } from 'src/_cores/constants/app.constant';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import path from 'node:path';
import { diskStorage } from 'multer';

@Controller(`${API_VERSION}/uploads`)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // ['products', 'users']
  @Post(':type/:entityId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: function (req, file, cb) {
          const { type } = req.params;

          cb(null, path.join(__dirname, '..', '..', 'uploads', type));
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now();
          cb(null, `${uniqueSuffix}-${file.originalname}`);
        },
      }),
    }),
  )
  async uploadFile(
    @Param('type') type: string,
    @Param('entityId', ParseIntPipe) entityId: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1048576 }),
          new FileTypeValidator({
            fileType: 'image/*',
            skipMagicNumbersValidation: true,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    await this.uploadService.upload(type, entityId, file);
    return {
      message: 'success',
    };
  }

  // ['products', 'users']
  @Post('')
  @UseInterceptors(FilesInterceptor('files'))
  uploadManyFile(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1048576 }),
          new FileTypeValidator({
            fileType: 'image/*',
            skipMagicNumbersValidation: true,
          }),
        ],
      }),
    )
    files: Array<Express.Multer.File>,
  ) {
    console.log('files', files);
    // await this.uploadService.upload(type, entityId, files[0]);
    return {
      message: 'success',
    };
  }
}
