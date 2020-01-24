import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { TodoModule } from 'src/todo/todo.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JWTStrategy } from './jwt.strategy';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({
    secret: "12345678901234567890",
    signOptions: {expiresIn: '60s'},
  })],
  providers: [AuthService, LocalStrategy, JWTStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
