import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Role } from 'src/role/entity/role.entity';
import { RoleModule } from 'src/role/role.module';
import { AuthModule } from 'src/auth/auth.module';




@Module({
  imports:[AuthModule,TypeOrmModule.forFeature([User,Role])],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService],
})
export class UserModule {}
