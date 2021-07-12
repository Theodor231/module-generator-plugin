import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Transform } from 'class-transformer';

const rootDirectory = 'storage';

export function SaveFile(filename: string, destination: string) {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor(filename, {
        storage: diskStorage({
          destination: `${rootDirectory}/${destination}`,
          filename: (req, file, cb) => {
            // Generating a 32 random chars long string
            const randomName = Array(32)
              .fill(null)
              .map(() => Math.round(Math.random() * 16).toString(16))
              .join('');
            //Calling the callback passing the random name generated with the original extension name
            cb(null, `${randomName}${extname(file.originalname)}`);
          },
        }),
      }),
    ),
  );
}

export const Public = () => SetMetadata('isPublic', true);

export const ToBoolean = () =>
  Transform(
    ({ value }) => {
      return JSON.parse(value);
    },
    {
      toPlainOnly: true,
    },
  );
