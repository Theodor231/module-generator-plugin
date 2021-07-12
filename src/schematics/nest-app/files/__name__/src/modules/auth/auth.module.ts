import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature(),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: true,
    }),
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: {
        expiresIn: '30000s',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
