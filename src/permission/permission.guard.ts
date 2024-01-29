// permission.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly roleService: RoleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roleName = this.reflector.get<string>('role', context.getHandler());
    if (!roleName) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasRole = user.roles.some((role) => role.name === roleName);
    if (hasRole) {
      return true;
    }
    return false;
  }
}
