import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { Role } from 'src/role/entity/role.entity';
import { RoleModule } from 'src/role/role.module';
import { AuthModule } from 'src/auth/auth.module';
import { UtilsModule } from 'src/utils/utils.module';
import { RoleService } from 'src/role/role.service';
import { Permission } from 'src/permission/entity/permission.entity';
import { JwtService } from '@nestjs/jwt';
import { PermissionService } from 'src/permission/permission.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User, Role, Permission]),
    UtilsModule,
  ],
  controllers: [UserController],
  providers: [UserService, RoleService, JwtService, PermissionService],
  exports: [UserService],
})
export class UserModule {}
