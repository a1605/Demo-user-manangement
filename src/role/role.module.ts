import { PermissionModule } from './../permission/permission.module';
import { UtilsModule } from 'src/utils/utils.module';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entity/role.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { Permission } from 'src/permission/entity/permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, Permission]),
    UtilsModule,
    forwardRef(() => PermissionModule),
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
