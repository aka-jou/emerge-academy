import { Injectable, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
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
    private readonly config: ConfigService,
  ) {}

  private signToken(userId: string, email: string) {
    return this.jwtService.sign({ sub: userId, email })
  }

  // Lista de correos que deben tener rol "admin" (pueden programar sesiones en vivo),
  // configurada por variable de entorno. No hay panel para asignar el rol desde la UI.
  private getAdminEmails(): string[] {
    const raw = this.config.get<string>("ADMIN_EMAILS") ?? ""
    return raw
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean)
  }

  // Si el correo del usuario está en ADMIN_EMAILS pero su rol en la base de datos todavía
  // no es "admin" (por ejemplo, se agregó a la lista después de que ya tenía cuenta), lo
  // actualiza en el momento. Así no hace falta un panel para asignar roles.
  private async syncAdminRole(userId: string, email: string, currentRole: string) {
    const shouldBeAdmin = this.getAdminEmails().includes(email.trim().toLowerCase())
    if (shouldBeAdmin && currentRole !== "admin") {
      await this.usersService.setRole(userId, "admin")
    }
  }

  async register(dto: RegisterDto) {
    const passwordHash = await bcrypt.hash(dto.password, SALT_ROUNDS)
    const user = await this.usersService.create({
      name: dto.name,
      email: dto.email,
      passwordHash,
      company: dto.company,
      phone: dto.phone,
      jobTitle: dto.jobTitle,
      industry: dto.industry,
      rfc: dto.rfc,
      birthDate: dto.birthDate,
      educationLevel: dto.educationLevel,
      yearsExperience: dto.yearsExperience,
      referralSource: dto.referralSource,
    })
    await this.syncAdminRole(user.id, user.email, user.role)
    const fresh = await this.usersService.findById(user.id)
    return {
      accessToken: this.signToken(user.id, user.email),
      user: toPublicUser(fresh ?? user),
    }
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email)
    if (!user) throw new UnauthorizedException("Correo o contraseña incorrectos.")

    const matches = await bcrypt.compare(dto.password, user.passwordHash)
    if (!matches) throw new UnauthorizedException("Correo o contraseña incorrectos.")

    await this.syncAdminRole(user.id, user.email, user.role)
    const fresh = await this.usersService.findById(user.id)
    return {
      accessToken: this.signToken(user.id, user.email),
      user: toPublicUser(fresh ?? user),
    }
  }
}
