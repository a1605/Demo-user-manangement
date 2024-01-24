import { Module } from '@nestjs/common';
import { RoleController } from './controller/role.controller';
import { RoleService } from './services/role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entity/role.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Role])],
  controllers: [RoleController],
  providers:[RoleService]
})
export class RoleModule {}
