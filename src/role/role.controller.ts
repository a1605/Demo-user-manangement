import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/createRole.dto';
import { UpdateRoleDto } from './dto/updateRole.dto';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}
  @Get()
  async getRoles() {
      return this.roleService.getRoles();
    
  }
  @Post()
  async addrole(@Body() createRoleDto: CreateRoleDto) {
    
       this.roleService.addrole(createRoleDto);
       return "Role has been created Successfully"
  }
  @Put(':id')
  async updateRolebyId(@Param('id') id:number, @Body() updateroleDto: UpdateRoleDto) {
    
      this.roleService.updateRolebyId(id, updateroleDto);
      return "Role has been updated Successfully"
  }
  @Delete(':id')
  async deleteRolebyId(@Param('id') id:number) {
    
      this.roleService.deleteRoleById(id);
      return "Role has been deleted Successfully"
  }
}
