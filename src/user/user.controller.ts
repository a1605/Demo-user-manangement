import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/role/entity/role.entity';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { CreateUserdto } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private userservice: UserService) {}
  @Get()
  async findAllUsers() {
      return this.userservice.getAllUsers();
  }

  @Post('add')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createUser(@Body() createUserDTO: CreateUserdto) {
      this.userservice.createUser(createUserDTO);
      return "User has been created successfully"
    
  }
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    
      const user = await this.userservice.getUserById(id);
      if (!user) {
        throw new NotFoundException(`User not found`);
      }
      return user;
    
  }
  @Put(':id')
  async updateUserDetails(
    @Param('id') id: number,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
      this.userservice.updateUserDetails(id, updateUserDTO);
      return "User Details has been Updated successfully"
  }
  @Delete(':id')
  async deleteUserById(@Param('id') id: number) {
    
      this.userservice.deleteById(id);
      return "User has been deleted successfully"
    
  }

  @Post(':userId/assign/:roleId')
  async assignRoleToUser(@Param('userId') userId:number, @Param('roleId') roleId:number) {
     return await this.userservice.assignRoleToUser(userId, roleId);
      
    
  }
  
}
