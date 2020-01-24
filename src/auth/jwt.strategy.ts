import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Request } from "express";

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
      secretOrKey: "12345678901234567890",
    })
  }

  // payload = JWT decoded from request's header
  async validate(payload: any) {
    return {user: payload.username, data: payload};
  }
}