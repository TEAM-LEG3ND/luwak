import { Body, Controller, Post, Req } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/login.dto';
import { TokensDto } from './dto/token.dto';
import { RefreshDto } from './dto/refresh.dto';
import { CheckEmailDto } from './dto/checkEmail.dto';
import { CheckNicknameDto } from './dto/checkNickname.dto';
import { Request } from 'express';

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
  refresh(@Body() refreshDto: RefreshDto): Promise<TokensDto> {
    return this.authService.refresh(refreshDto);
  }

  @Post('check-email-exists')
  async checkEmailExists(@Body() checkEmailDto: CheckEmailDto): Promise<{ exists: boolean }> {
    const exists = await this.authService.checkEmailExists(checkEmailDto);
    return { exists };
  }

  @Post('check-nickname-exists')
  async checkNicknameExists(@Body() checkNicknameDto: CheckNicknameDto): Promise<{ exists: boolean }> {
    const exists = await this.authService.checkNicknameExists(checkNicknameDto);
    return { exists };
  }
}
