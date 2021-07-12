import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from '../../helpers/decorators';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Get('login')
  login(@Query() params: LoginDto) {
    return this.authService.login(params);
  }

  @Public()
  @Get('logout')
  logout() {
    return this.authService.logout();
  }
}
