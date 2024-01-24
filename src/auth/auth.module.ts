import { Strategy } from 'passport-jwt';
// auth/auth.module.ts
///home/anuj/Downloads/NodejsProgram/nestjsProjects/demo/src/auth/controller/auth.controller.ts

import { Module,forwardRef } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
//import { JwtStrategy } from './jwt.Strategy';
import { UserModule } from '../user/user.module';
import { UserService } from 'src/user/services/user.service';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Role } from 'src/role/entity/role.entity';
import { JwtStrategy } from './jwt.strategy';
//import { LocalStrategy } from './local.strategy.ts'; 

@Module({
  imports: [TypeOrmModule.forFeature([User,Role]),
  forwardRef(() => UserModule),
    PassportModule.register({
      defaultStrategy:'jwt'
    }),
    JwtModule.register({
      secret: 'secret_key', // Replace with your actual secret key
      signOptions: { expiresIn: '3d' },
    }),
  ],
  controllers: [AuthController],
  providers: [UserService,AuthService,JwtStrategy],
  exports:[JwtStrategy,PassportModule]
})
export class AuthModule {}
