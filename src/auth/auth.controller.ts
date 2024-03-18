import { Controller, Post, Body } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/login.dto';
import { NewAccessTokenDto, TokensDto } from './dto/token.dto';
import { RefreshDto } from './dto/refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<TokensDto> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  login(@Body() loginDto: LogInDto): Promise<TokensDto> {
    return this.authService.login(loginDto);
  }

  @Post('/refresh')
  refresh(@Body() refreshDto: RefreshDto): Promise<NewAccessTokenDto> {
    return this.authService.refresh(refreshDto);
  }
}
