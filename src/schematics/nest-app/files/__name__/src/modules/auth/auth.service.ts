import {
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { Connection } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(private connection: Connection, private jwtService: JwtService) {}

  async onModuleInit() {
    const conn = this.connection.getRepository('user');
    const password = await bcrypt.hash('12345678', 8);
    const user = {
      password,
      name: 'admin',
      email: 'admin@gmail.com',
      roleId: null,
      avatar: null,
    };
    const exists = await conn.findOne({
      where: {
        email: user.email,
      },
    });

    if (!exists) {
      const rolesConn = this.connection.getRepository('role');
      const newRole: any = {
        alias: 'admin',
        name: 'Admin',
        guard: 'api',
      };

      const roleExists: any = await rolesConn.findOne({
        where: { alias: 'admin' },
      });

      if (!roleExists) {
        const role = await rolesConn.save(newRole);
        user.roleId = role.id;
      } else {
        user.roleId = roleExists.id;
      }

      await conn.save(user);
    }
  }

  async login(user: any) {
    const conn = this.connection.getRepository('user');

    const currentUser: any = await conn.findOne({
      email: user.email,
    });

    if (currentUser) {
      const isMatch = this.validatePassword(
        user.password,
        currentUser.password,
      );

      if (isMatch) {
        const payload = { username: user.email, sub: currentUser.id };
        delete currentUser.password;
        const token = `Bearer ${this.jwtService.sign(payload, {
          secret: process.env.SECRETKEY,
        })}`;

        return {
          token,
          user: currentUser,
        };
      }
    }
    throw new UnauthorizedException('Unauthorized');
  }

  validatePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  logout() {
    return true;
  }
}
