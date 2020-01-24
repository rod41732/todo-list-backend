import { Controller, UseGuards, Post, Req, Get, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async loginUser(
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.authService.login(req.user);
    const {access_token} = result as any;
    res.cookie('token', access_token).send(result);
    // return res.header('Authorization', `Bearer ${access_token}`).send(result);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/status')
  async getCurrentUser(
    @Req() req: Request,
  ) {
    // req.user is from JWTService decoded from JWT payload
    return req.user;
  }
}
