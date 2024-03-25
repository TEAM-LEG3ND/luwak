import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.usersRepository.find({});
  }

  async findById(id: number): Promise<User> | null {
    const user = await this.usersRepository.findOne({
      where: {
        id: id,
      },
    });
    if (user) return user;
    else return null;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User | undefined> {
    const newUser = await this.usersRepository.create(createUserDto);
    await this.usersRepository.save({
      name: createUserDto.name,
      nickname: createUserDto.nickname,
      email: createUserDto.email,
      password: createUserDto.password,
    });
    return newUser;
  }

  async deleteById(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      return null;
    }
    await this.usersRepository.remove(user);
    return user;
  }
}
