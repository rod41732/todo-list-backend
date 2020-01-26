import { Controller, Get, Body, Post, ValidationPipe, Res, UsePipes, UseGuards, Req, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from "bcrypt";
import { createUserDto } from './dto/createUser.dto';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
  ) {}
  
  @Post('/register') 
  async createUser(
    @Body() user: createUserDto,
  ) {
    user.password = await bcrypt.hash(user.password, 10);
    try {
      return await this.userService.createUser(user);
    } catch (err) {
        console.log(`Register: Username ${user.username} already exist`);
      if (err.code === 11000) { 
        throw new BadRequestException(`Username ${user.username} already exist`);
      }
      console.error(err);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

}
