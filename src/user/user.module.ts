import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { Role } from 'src/role/entity/role.entity';
import { RoleModule } from 'src/role/role.module';
import { AuthModule } from 'src/auth/auth.module';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User, Role]),UtilsModule],
  controllers: [UserController],
  providers: [UserService
  ],
  exports: [UserService],
})
export class UserModule {}
