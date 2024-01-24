import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from 'src/user/services/user.service';
import { AuthService } from './service/auth.service';
import { Role } from 'src/role/entity/role.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor(private userService :UserService,
        private authService:AuthService
        ){
            super({
                jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey:'secret_key'
            })
        }

        async validate(payload: any)
         {
            //console.log(payload.id)
            const id=payload.id
            const user= await this.userService.getUserById(id);
              if(!user)
                throw new UnauthorizedException('First Login to the user to access this api')
            return user
          }

}