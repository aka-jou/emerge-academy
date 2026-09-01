import { Body, Controller, Get, HttpCode, NotFoundException, Patch, Post, UseGuards } from "@nestjs/common"
import { JwtAuthGuard } from "../auth/jwt-auth.guard"
import { CurrentUser } from "../auth/current-user.decorator"
import { UsersService } from "./users.service"
import { UpdateProfileDto } from "./dto/update-profile.dto"
import { ChangePasswordDto } from "./dto/change-password.dto"
import { toPublicUser } from "./user.serializer"

@Controller("users")
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("me")
  async me(@CurrentUser() currentUser: { userId: string }) {
    const user = await this.usersService.findById(currentUser.userId)
    if (!user) throw new NotFoundException("Usuario no encontrado.")
    return toPublicUser(user)
  }

  @Patch("me")
  async updateMe(@CurrentUser() currentUser: { userId: string }, @Body() dto: UpdateProfileDto) {
    const user = await this.usersService.updateProfile(currentUser.userId, dto)
    return toPublicUser(user)
  }

  @Post("me/password")
  @HttpCode(204)
  async changePassword(@CurrentUser() currentUser: { userId: string }, @Body() dto: ChangePasswordDto) {
    await this.usersService.changePassword(currentUser.userId, dto.currentPassword, dto.newPassword)
  }
}
