import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { User } from '../user/entities/user.entity';
import { RolesGuard } from './guards/roles.guard'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, RolesGuard],
  exports: [AuthService],
})
export class AuthModule {}
