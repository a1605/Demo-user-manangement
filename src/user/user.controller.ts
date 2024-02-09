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
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/role/entity/role.entity';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { CreateUpdateUserDto } from './dto/createUpdate-user.dto';
import { PermissionGuard } from 'src/permission/permission.guard';
import { ResponseInterceptor } from 'src/middleware/middleware.interceptor';

@Controller('user')
@UseInterceptors(ResponseInterceptor)
export class UserController {
  constructor(private userservice: UserService) {}
  @Get('all-users')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async findAllUsers() {
    return await this.userservice.getAllUsers();
  }

  @Post('add-user')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async createUser(@Body() createUpdateUserDto: CreateUpdateUserDto) {
    return await this.userservice.createUser(createUpdateUserDto);
  }
  @Get('get-user/:id')
  async getUserById(@Param('id') id: number) {
    const user = await this.userservice.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }
  @Put('update-user/:id')
  async updateUserDetails(
    @Param('id') id: number,
    @Body() createUpdateUserDto: CreateUpdateUserDto,
  ) {
    return await this.userservice.updateUserDetails(id, createUpdateUserDto);
  }
  @Delete('delete-user/:id')
  async deleteUserById(@Param('id') id: number) {
    return await this.userservice.deleteById(id);
  }

  @Post(':userId/assign/:roleId')
  async assignRoleToUser(
    @Param('userId') userId: number,
    @Param('roleId') roleId: number,
  ) {
    return await this.userservice.assignRoleToUser(userId, roleId);
  }
}
