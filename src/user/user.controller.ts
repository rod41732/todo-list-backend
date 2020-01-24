import { Controller, Get, Body, Post, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/interfaces/user.interface';
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
  ) {}
  
  @Post('/register') 
  createUser(
    @Body() user: User,
  ) {
    return this.userService.createUser(user);
  }
  
  @Post('/login')
  async loginUser(
    @Body() user: User
  ) {
    const foundUser = await this.userService.findByUsername(user.username);
    const match = await bcrypt.compare(user.password, foundUser.password.toString());
    if (match) {
      return "OK"
    } else {
      throw new HttpException("bad password", HttpStatus.UNAUTHORIZED);
    }
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

}
