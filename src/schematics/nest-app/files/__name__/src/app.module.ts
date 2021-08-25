import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesModule } from './modules/roles/roles.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PermisionsModule } from './modules/permisions/permisions.module';
import { LocalizationService } from './services/localization.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    RolesModule,
    UsersModule,
    AuthModule,
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
    PermisionsModule,
    LocalizationService,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('auth/(.*)', 'storage/(.*)')
      .forRoutes('*');
  }
}
