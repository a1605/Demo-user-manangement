import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Role } from 'src/role/entity/role.entity';
import { RoleService } from 'src/role/role.service';
import { PathCorrection } from 'src/utils/path.utils';
import { Permission } from 'src/permission/entity/permission.entity';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private roleService: RoleService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: { roles: Role[] } = request.user;
    const userRoleNames = user.roles;
    const permissionPromises = userRoleNames.map(async (roleName) => {
      const role = await this.roleService.findByRolename(roleName['name']);
      return role ? role['permissions'] : [];
    });
    const permissionsArrays = await Promise.all(permissionPromises);
    const allPermissions: Permission[] = [].concat(...permissionsArrays);

    const requestUrl = request.url;
    const requestMethod = request.method.toLowerCase();
    let permissionGuard = 0;
    for (const permission of allPermissions) {
      if (
        PathCorrection.urlCorrection(permission.url).includes(
          PathCorrection.urlCorrection(requestUrl),
        ) &&
        permission.method.toLowerCase() === requestMethod.toLowerCase()
      ) {
        permissionGuard = 1;
        break;
      }
    }
    if (permissionGuard == 1) return true;
    else return false;
  }
}
