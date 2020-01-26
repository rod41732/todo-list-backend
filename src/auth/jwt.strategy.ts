import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Request } from "express";
import { config } from "src/config";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: (req: Request) => {
        let token = null;
        if (req && req.cookies) {
          return req.cookies.token;
        }
      },
      ignoreExpiration: false,
      secretOrKey: config.jwtSecret,
    })
  }

  // payload = JWT decoded from request's header
  async validate(payload: any) {
    return {user: payload.id};
  }
}