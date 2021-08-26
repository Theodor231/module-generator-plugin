import {
    ArgumentMetadata,
    Injectable,
    PipeTransform
  } from '@nestjs/common';
  import { plainToClass } from 'class-transformer';
  import { validate } from 'class-validator';
  import { ValidationException } from '../exceptions/validation.exception';
  
  @Injectable()
  export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
      const obj = plainToClass(metadata.metatype, value);
      let errors = [] as any[];
      try {
        errors = await validate(obj);
      } catch (e) {}
  
      if (errors.length) {
        const messages = {} as any;
        errors.forEach((err: any) => {
          messages[err.property] =
            err.constraints[Object.keys(err.constraints)[0]];
          return err;
        });
        throw new ValidationException(messages);
      }
  
      return value;
    }
  }
  