import { Body, Controller, Post, UseGuards, Get } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/login.dto';
import { TokensDto } from './dto/token.dto';
import { RefreshDto } from './dto/refresh.dto';
import { CheckEmailDto } from './dto/checkEmail.dto';
import { CheckNicknameDto } from './dto/checkNickname.dto';
import { Auth } from 'src/auth/auth.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from './../users/user.entity';
import { UsersService } from './../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async findOne(@Auth() user: User): Promise<User> {
    return await this.authService.getUserById(Number(user.id));
  }

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto): Promise<TokensDto> {
    return this.authService.signUp(signUpDto);
  }

  @Post('login')
  async login(@Body() loginDto: LogInDto): Promise<TokensDto> {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  async refresh(@Body() refreshDto: RefreshDto): Promise<TokensDto> {
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
