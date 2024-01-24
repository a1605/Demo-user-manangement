// auth/auth.controller.ts

import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
//import { LocalAuthGuard } from '../local-auth.guard';
import { LoginDto } from '../dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
 // @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body()loginDto:LoginDto) 
  {
    try
    {
    return this.authService.login(loginDto);
    }
    catch (error) 
    {
      console.error(error);
      throw error;
    
     }
  }
}
