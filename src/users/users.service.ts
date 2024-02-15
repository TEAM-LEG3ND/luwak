import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UserRepository) {}

  async getAllUsers() {
    return await this.usersRepository.getAllUsers();
  }
  async getUserById(id: number) {
    const user = await this.usersRepository.findById(id);
    if (user) {
      return user;
    }
    throw new NotFoundException('Could not find the user');
  }

  async createUser(createUserDto: CreateUserDto) {
    return await this.usersRepository.createUser(createUserDto);
  }

  async deleteById(id: number) {
    const user = await this.usersRepository.deleteById(id);
    if (user) return user;
    throw new NotFoundException('Could not find the user');
  }
}
