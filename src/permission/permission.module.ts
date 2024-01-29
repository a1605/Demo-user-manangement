import { RoleModule } from 'src/role/role.module';
import { Module, forwardRef } from '@nestjs/common';
import { PermisionController } from './permission.controller';
import {  PermissionService } from './permission.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entity/permission.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Permission]),forwardRef(()=>RoleModule)],
  controllers: [PermisionController],
  providers: [PermissionService]
})
export class PermissionModule {}
