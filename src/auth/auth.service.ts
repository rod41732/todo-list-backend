import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { compare } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { User } from 'src/user/user';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // this validate user based on {username, password} of request.body
  async validateUser(username: string, pass: string): Promise<any> {
    
    let user = (await this.userService.findByUsername(username));
    if (user === null)
      throw new UnauthorizedException();
    user = user.toJSON();
    const match = await compare(pass , user.password.toString());
    if (match) {
      const {password, ...result} = user;
      return result;
    } else {
      return null;
    }
  }

  // this is merely a service for converting req.user (which is set by AuthGuard('local'))
  // it's called manually in controller, it's up to user to use this token
  async login(user: any) {
    const payload = {id: user._id};
    return {
      access_token: this.jwtService.sign(payload),
    };
  } 


}
