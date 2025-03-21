import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserCreateDTO } from '../services/dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UserUpdateDTO } from '../services/dto/update-user.dto';
// import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/authentication/guards/roles.guard';
import { Roles } from 'src/auth/authentication/decorators/roles.decorator';

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
  // @UseGuards(AuthGuard('jwt'),RolesGuard)
  @UseGuards(RolesGuard)
  // @Roles('admin')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

}
