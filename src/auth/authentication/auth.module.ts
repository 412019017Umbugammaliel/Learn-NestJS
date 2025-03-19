import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { User } from '../user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from './guards/roles.guard'
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({secret: 'test-secret-key', signOptions: { expiresIn: '1h' },})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RolesGuard],
  exports: [AuthService],
})
export class AuthModule {}
