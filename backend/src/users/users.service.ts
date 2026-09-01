import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import * as bcrypt from "bcrypt"
import { User } from "./user.entity"

const SALT_ROUNDS = 10

export type UpdateProfileInput = Partial<Pick<User, "name" | "phone" | "company" | "cityCountry">>

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepo: Repository<User>) {}

  findByEmail(email: string) {
    return this.usersRepo
      .createQueryBuilder("user")
      .addSelect("user.passwordHash")
      .where("user.email = :email", { email: email.trim().toLowerCase() })
      .getOne()
  }

  findById(id: string) {
    return this.usersRepo.findOne({ where: { id } })
  }

  async create(data: { name: string; email: string; passwordHash: string }) {
    const email = data.email.trim().toLowerCase()
    const existing = await this.usersRepo.findOne({ where: { email } })
    if (existing) {
      throw new ConflictException("Ya existe una cuenta con este correo.")
    }
    const user = this.usersRepo.create({ name: data.name.trim(), email, passwordHash: data.passwordHash })
    return this.usersRepo.save(user)
  }

  async updateProfile(id: string, data: UpdateProfileInput) {
    const user = await this.usersRepo.findOne({ where: { id } })
    if (!user) throw new NotFoundException("Usuario no encontrado.")
    Object.assign(user, data)
    return this.usersRepo.save(user)
  }

  async changePassword(id: string, currentPassword: string, newPassword: string) {
    const user = await this.usersRepo
      .createQueryBuilder("user")
      .addSelect("user.passwordHash")
      .where("user.id = :id", { id })
      .getOne()
    if (!user) throw new NotFoundException("Usuario no encontrado.")

    const matches = await bcrypt.compare(currentPassword, user.passwordHash)
    if (!matches) throw new UnauthorizedException("La contraseña actual no es correcta.")

    user.passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS)
    await this.usersRepo.save(user)
  }
}
