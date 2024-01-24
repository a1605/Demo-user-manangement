import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { RoleModule } from './role/role.module';
import { Role } from './role/entity/role.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './user/services/user.service';
import {config} from 'dotenv'


@Module({
  imports: [UserModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'db',
    autoLoadEntities:true,
    entities: [User,Role],
    synchronize: true,
  }),
    RoleModule,
    AuthModule
    
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
