import { Module } from '@nestjs/common';
import { PermisionController } from './controller/permission.controller';
import {  PermissionService } from './service/permission.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entity/permission.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Permission])],
  controllers: [PermisionController],
  providers: [PermissionService]
})
export class PermissionModule {}
