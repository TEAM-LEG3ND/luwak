import { Injectable, UnauthorizedException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';
import { LogInDto } from './dto/login.dto';
import { TokensDto } from './dto/token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { RefreshDto } from './dto/refresh.dto';
import { CheckEmailDto } from './dto/checkEmail.dto';
import { CheckNicknameDto } from './dto/checkNickname.dto';
import { UserRepository } from './../users/user.repository';
import { CreateUserDto } from './../users/dto/user.dto';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private customUserRepository: UserRepository,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<TokensDto> {
    try {
      const { nickname, email, password } = signUpDto;
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      if (!passwordRegex.test(password)) {
        throw new UnauthorizedException(
          'Password must be at least 8 characters long and contain at least one letter, one digit, and one special character.',
        );
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const createUserDto: CreateUserDto = {
        nickname,
        email,
        password: hashedPassword,
      };
      const user = await this.customUserRepository.createUser(createUserDto);
      const accessToken = this.jwtService.sign({ id: user.id }, { expiresIn: process.env.ACCESS_EXPIRES });
      const refreshToken = this.jwtService.sign({ id: user.id }, { expiresIn: process.env.REFRESH_EXPIRES });
      return new TokensDto(accessToken, refreshToken);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async login(loginDto: LogInDto): Promise<TokensDto> {
    const { email, password } = loginDto;
    const user = await this.usersRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const accessToken = this.jwtService.sign({ id: user.id }, { expiresIn: process.env.ACCESS_EXPIRES });
    const refreshToken = this.jwtService.sign({ id: user.id }, { expiresIn: process.env.REFRESH_EXPIRES });
    return new TokensDto(accessToken, refreshToken);
  }

  async refresh(refreshDto: RefreshDto): Promise<TokensDto> {
    const { oldRefreshToken } = refreshDto;
    try {
      const decoded = this.jwtService.verify(oldRefreshToken);
      const userId = decoded.id;
      const user = await this.usersRepository.findOne({
        where: {
          id: userId,
        },
      });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const refreshTokenExpiryTime = decoded.exp * 1000;
      const currentTime = Date.now();
      const timeDifference = refreshTokenExpiryTime - currentTime;
      const closeToExpirationThreshold = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      const isCloseToExpiration = timeDifference <= closeToExpirationThreshold;

      const accessToken = this.jwtService.sign({ id: user.id }, { expiresIn: process.env.ACCESS_EXPIRES });

      // Return both access token and refresh token if close to expiration
      if (isCloseToExpiration) {
        const newRefreshToken = this.jwtService.sign({ id: user.id }, { expiresIn: process.env.REFRESH_EXPIRES });
        return new TokensDto(accessToken, newRefreshToken);
      }
      return new TokensDto(accessToken);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async checkEmailExists(checkEmailDto: CheckEmailDto): Promise<boolean> {
    const { email } = checkEmailDto;
    const user = await this.usersRepository.findOne({ where: { email } });
    return !!user;
  }

  async checkNicknameExists(checkNicknameDto: CheckNicknameDto): Promise<boolean> {
    const { nickname } = checkNicknameDto;
    const user = await this.usersRepository.findOne({ where: { nickname } });
    return !!user;
  }

  async getUserById(id: number) {
    const user = await this.customUserRepository.findById(id);
    if (user) {
      return user;
    }
    throw new NotFoundException('Could not find the user');
  }
}
