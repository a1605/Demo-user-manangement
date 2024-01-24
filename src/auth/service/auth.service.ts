// auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/services/user.service';
import { LoginDto } from '../dto/login.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto:LoginDto):Promise<{token:string}>
  {
    const{username,password}=loginDto
    const user = await this.userService.findByUsername(username);
    if(!user)
      throw new UnauthorizedException('user not present');
    if(user.password!==password)
      throw new UnauthorizedException('Password does not matched ')
//console.log(user)

    const token =this.jwtService.sign({id:user.id,username:user.username,roles:user.roles})

    return {token};


  }
}
