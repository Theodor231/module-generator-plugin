import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { NextFunction } from 'express';
import { Connection } from 'typeorm';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private connection: Connection) {}

  async use(req: any, res: Response, next: NextFunction) {
    const authHeaders: any = req.headers.authorization;

    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];
      try {
        const decoded: any = jwt.verify(token, process.env.SECRETKEY);

        if (!decoded) {
          throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
        }

        req.user = await this.connection
          .getRepository('user')
          .findOne(decoded.sub);

        if (!req.user) {
          throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
        }

        req.permissions = await this.connection
          .getRepository('permissions')
          .find({
            where: {
              role: req.user.role.alias,
              module: req.baseUrl.split('/')[1],
            },
          });
      } catch (e) {
        throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
      }
    } else {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
    next();
  }
}
