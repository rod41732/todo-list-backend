import { Controller, Get, Body, Post, ValidationPipe, Res, UsePipes, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from "bcrypt";
import { createUserDto } from './dto/createUser.dto';
import { loginDto } from "./dto/login.dto";
import { Response, Request } from 'express';
import { sign} from "jsonwebtoken";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
  ) {}
  
  @UsePipes(new ValidationPipe({
    whitelist: true,
  }))
  @Post('/register') 
  async createUser(
    @Body() user: createUserDto,
  ) {
    user.password = await bcrypt.hash(user.password, 10);
    return this.userService.createUser(user);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

}
