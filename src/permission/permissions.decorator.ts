import { SetMetadata } from '@nestjs/common';
export const Permissions = (...permissions: string[]) => SetMetadata('permissions', permissions);

export const NewRoles = (...roles: string[]) => SetMetadata('roles', roles);
