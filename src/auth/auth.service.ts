import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    try {
      const { username, password } = loginDto;
      const user = await this.userService.findByUsername(username);
      if (!user) throw new UnauthorizedException('user not present');

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new UnauthorizedException('Password does not match');
      }
      const token = this.jwtService.sign({
        id: user.id,
        username: user.username,
        roles: user.roles,
      });

      return { token };
    } catch (err) {
      if (err.status) {
        throw err;
      }
      throw new HttpException('Internal Server Error',
      HttpStatus.INTERNAL_SERVER_ERROR,);
    }
  }
}
