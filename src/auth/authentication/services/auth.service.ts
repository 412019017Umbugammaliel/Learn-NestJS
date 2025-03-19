import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
    ) {}

    async register(registerDto: RegisterDto) {
        const { nik, name, email, bagian, password } = registerDto;
    
        // const salt = await bcrypt.genSalt(10);
        const user = this.userRepository.create({
            nik,
            name,
            email,
            bagian,
            password
        });
    
        await this.userRepository.save(user);
        return user;
    }
    
    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;
        const user = await this.userRepository.findOne({ where: { email } });
    
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Password Salah');
        }
    
        const payload = { email: user.email, sub: user.id };
    
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                nik:user.nik,
                name: user.name,
                email: user.email,
                bagian: user.bagian
            }
        };
    }
    
}
