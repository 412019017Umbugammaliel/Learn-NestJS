import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async register(registerDto: RegisterDto) {
        const { nik, name, email, bagian, role } = registerDto;

        const user = this.userRepository.create({
            nik,
            name,
            email,
            bagian,
            role:role || 'user'
        });
    
        await this.userRepository.save(user);
        return user;
    }
    
    async login(loginDto: LoginDto) {
        const { email } = loginDto;
        const user = await this.userRepository.findOne({ where: { email } });
    
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
    
        const payload = { email: user.email, sub: user.id, role:user.role };
    
        return {
            user: {
                id: user.id,
                nik:user.nik,
                name: user.name,
                email: user.email,
                bagian: user.bagian,
                role: user.role
            }
        };
    }
    
}
