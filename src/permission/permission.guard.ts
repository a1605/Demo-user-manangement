import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Role } from 'src/role/entity/role.entity';
import { RoleService } from 'src/role/role.service';
import { Permission } from 'src/permission/entity/permission.entity';
import { urlCorrection } from 'utils';


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
    for (const permission of allPermissions) {
      if (
        urlCorrection(permission.url).includes(
          urlCorrection(requestUrl)
        ) &&
        permission.method.toLowerCase() === requestMethod.toLowerCase()
      ) {
        return true;
      }
    }
    return false;
  }
}
