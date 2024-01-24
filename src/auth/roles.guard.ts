 import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserService } from "src/user/services/user.service";
@Injectable()
export class RolesGuard implements CanActivate
{
    constructor(private reflector:Reflector,
        private userService :UserService){}
    async canActivate(context: ExecutionContext):  Promise<boolean> 
    {
        const allowedRoles=this.reflector.get<string[]>('roles',context.getHandler())
       
        const request=context.switchToHttp().getRequest();

        const user = request.user;

         if (!user || !user.roles) 
         {
           // User or roles are undefined, deny access
            return false;
         }

       return user.roles.some(role => allowedRoles.includes(role.name));
    }
        
}

