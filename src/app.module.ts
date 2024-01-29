import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/entity/user.entity';
import { RoleModule } from './role/role.module';
import { Role } from './role/entity/role.entity';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { config } from 'dotenv';
import { PermissionModule } from './permission/permission.module';
import { Permission } from './permission/entity/permission.entity';
import { UserModule } from './user/user.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      entities: [User, Role, Permission],
      synchronize: true,
    }),
    RoleModule,
    AuthModule,
    PermissionModule,
    UtilsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
