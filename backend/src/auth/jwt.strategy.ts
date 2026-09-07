import { Injectable, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { UsersService } from "../users/users.service"

export type JwtPayload = { sub: string; email: string }

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>("JWT_SECRET") ?? "dev-secret",
    })
  }

  async validate(payload: JwtPayload) {
    // Se consulta el rol actual en cada request (en vez de confiar en lo firmado en el
    // token) para que un cambio de rol tenga efecto sin esperar a que expire el token.
    const user = await this.usersService.findById(payload.sub)
    if (!user) throw new UnauthorizedException("Usuario no encontrado.")
    // Lo que retornamos aquí queda disponible como request.user en los controladores.
    return { userId: payload.sub, email: payload.email, role: user.role }
  }
}
