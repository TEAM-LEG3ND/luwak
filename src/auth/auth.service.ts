import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';
import { LogInDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    await this.usersRepository.save(user);
    const token = this.jwtService.sign({ id: user.id });
    return { token };
  }

  async login(loginDto: LogInDto): Promise<{ token: string }> {
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
    const token = this.jwtService.sign({ id: user.id });
    return { token };
  }
}
