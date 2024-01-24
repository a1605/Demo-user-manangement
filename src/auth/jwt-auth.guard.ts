// jwt-auth.guard.ts
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
//     canActivate(context: ExecutionContext) {
//         const request = context.switchToHttp().getRequest();
//         console.log('Request Object:', request.user);
        
//         return super.canActivate(context);
// }
}
