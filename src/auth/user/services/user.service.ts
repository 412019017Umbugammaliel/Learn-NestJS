import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserCreateDTO } from './dto/create-user.dto';
import { UserUpdateDTO } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userCreateDto: UserCreateDTO): Promise<User> {
    const user = this.userRepository.create(userCreateDto);
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async updateUser(id:string, updateData:UserUpdateDTO): Promise<User>{
    const user = await this.userRepository.findOne({ where: {id}});
    if(!user) {
        throw new Error('User with ID ${id} not found')
    }
    Object.assign(user, updateData);
    return await this.userRepository.save(user);
  }

  async deleteUser(id: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user){
        throw new NotFoundException('User with ID ${id} not found')
    }
    await this.userRepository.delete(id);
    return 'User has been delete successfully'
  }
}
