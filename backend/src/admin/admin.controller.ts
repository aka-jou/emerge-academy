import { Controller, Get, Param, UseGuards } from "@nestjs/common"
import { JwtAuthGuard } from "../auth/jwt-auth.guard"
import { AdminGuard } from "../auth/admin.guard"
import { AdminService } from "./admin.service"

@Controller("admin")
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("summary")
  getPlatformSummary() {
    return this.adminService.getPlatformSummary()
  }

  @Get("courses-overview")
  getCoursesOverview() {
    return this.adminService.getCoursesOverview()
  }

  @Get("courses/:courseId/students")
  getCourseStudents(@Param("courseId") courseId: string) {
    return this.adminService.getCourseStudents(courseId)
  }
}
