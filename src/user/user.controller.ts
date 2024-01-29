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
import { CreateUpdateUserDto } from './dto/createUpdate-user.dto';
import { PermissionGuard } from 'src/permission/permission.guard';

@Controller('user')
export class UserController {
  constructor(private userservice: UserService) {}
  @Get()
  async findAllUsers() {
    await this.userservice.getAllUsers();
  }

  @Post('add')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Roles('admin')
  async createUser(@Body() createUpdateUserDto: CreateUpdateUserDto) {
    await this.userservice.createUser(createUpdateUserDto);
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
    @Body() createUpdateUserDto: CreateUpdateUserDto,
  ) {
    await this.userservice.updateUserDetails(id, createUpdateUserDto);
  }
  @Delete(':id')
  async deleteUserById(@Param('id') id: number) {
    await this.userservice.deleteById(id);
  }

  @Post(':userId/assign/:roleId')
  async assignRoleToUser(
    @Param('userId') userId: number,
    @Param('roleId') roleId: number,
  ) {
    await this.userservice.assignRoleToUser(userId, roleId);
  }
}
