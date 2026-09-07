import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common"

// Se usa DESPUÉS de JwtAuthGuard en la misma ruta (@UseGuards(JwtAuthGuard, AdminGuard)),
// así que asume que request.user ya existe y ya trae el rol actual (ver JwtStrategy).
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    if (request.user?.role !== "admin") {
      throw new ForbiddenException("Esta acción requiere permisos de administrador.")
    }
    return true
  }
}
