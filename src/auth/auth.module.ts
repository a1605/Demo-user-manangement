import { Strategy } from 'passport-jwt';
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/entity/user.entity';
import { Role } from 'src/role/entity/role.entity';
import { JwtStrategy } from './jwt.strategy';
import { config } from 'dotenv';
config()
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    forwardRef(() => UserModule),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret:process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn:process.env.JWT_EXPIRATION_TIME },
    }),
  ],
  controllers: [AuthController],
  providers: [UserService, AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})

export class AuthModule {}
