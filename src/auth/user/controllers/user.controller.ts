import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserCreateDTO } from '../services/dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UserUpdateDTO } from '../services/dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userCreateDto: UserCreateDTO): Promise<User> {
    return this.userService.createUser(userCreateDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | null> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  async updateUser(@Param('id') id:string, @Body() updateData: UserUpdateDTO) {
    return this.userService.updateUser(id, updateData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

}
