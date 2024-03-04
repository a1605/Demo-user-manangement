import { RoleModule } from 'src/role/role.module';
import { Module, forwardRef } from '@nestjs/common';
import { PermisionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entity/permission.entity';
import { RoleService } from 'src/role/role.service';
import { Role } from 'src/role/entity/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission, Role]),
    forwardRef(() => RoleModule),
  ],
  controllers: [PermisionController],
  providers: [PermissionService, RoleService],
})
export class PermissionModule {}
