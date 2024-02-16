import { Controller, Post, Body } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/login.dto';
import { AccessTokenDto } from './dto/accessToken.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<AccessTokenDto> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  login(@Body() loginDto: LogInDto): Promise<AccessTokenDto> {
    return this.authService.login(loginDto);
  }
}
