import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleService } from 'src/role/role.service';


@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly roleService: RoleService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.get<string[]>('permissions', context.getHandler());
    if (!permissions) {
      return true; 
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const hasPermission = user.roles.some(role => role.permissions.some(permission => permissions.includes(permission.name)));

    return hasPermission;
  }
}
