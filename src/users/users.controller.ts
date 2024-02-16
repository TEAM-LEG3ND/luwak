import { Controller, Body, Get, Param, Post, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    const users = await this.usersService.getAllUsers();
    return users;
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.getUserById(Number(id));
    return user;
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.createUser(createUserDto);
    return newUser;
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteById(@Param('id') id: string): Promise<User> {
    const user = this.usersService.deleteById(Number(id));
    return user;
  }
}
