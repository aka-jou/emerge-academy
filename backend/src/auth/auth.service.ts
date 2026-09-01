import { Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcrypt"
import { UsersService } from "../users/users.service"
import { toPublicUser } from "../users/user.serializer"
import { RegisterDto } from "./dto/register.dto"
import { LoginDto } from "./dto/login.dto"

const SALT_ROUNDS = 10

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private signToken(userId: string, email: string) {
    return this.jwtService.sign({ sub: userId, email })
  }

  async register(dto: RegisterDto) {
    const passwordHash = await bcrypt.hash(dto.password, SALT_ROUNDS)
    const user = await this.usersService.create({ name: dto.name, email: dto.email, passwordHash })
    return {
      accessToken: this.signToken(user.id, user.email),
      user: toPublicUser(user),
    }
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email)
    if (!user) throw new UnauthorizedException("Correo o contraseña incorrectos.")

    const matches = await bcrypt.compare(dto.password, user.passwordHash)
    if (!matches) throw new UnauthorizedException("Correo o contraseña incorrectos.")

    return {
      accessToken: this.signToken(user.id, user.email),
      user: toPublicUser(user),
    }
  }
}
