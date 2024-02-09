import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateUpdateRoleDto } from './dto/createUpdateRole.dto';
import { PermissionService } from 'src/permission/permission.service';
import { ResponseInterceptor } from 'src/middleware/middleware.interceptor';

@Controller('role')
@UseInterceptors(ResponseInterceptor)
export class RoleController {
  constructor(private roleService: RoleService) {}
  @Get('all-roles')
  async getRoles() {
    return this.roleService.getRoles();
  }
  @Post('add-role')
  async addrole(@Body() createRoleDto: CreateUpdateRoleDto) {
    this.roleService.addrole(createRoleDto);
    return 'Role has been created Successfully';
  }
  @Put('update-role/:id')
  async updateRolebyId(
    @Param('id') id: number,
    @Body() updateroleDto: CreateUpdateRoleDto,
  ) {
    this.roleService.updateRolebyId(id, updateroleDto);
    return 'Role has been updated Successfully';
  }
  @Delete('delete-role/:id')
  async deleteRolebyId(@Param('id') id: number) {
    return this.roleService.deleteRoleById(id);
  }

  @Post(':roleId/assign/:permissionId')
  async assignPermisisionToRole(
    @Param('roleId') roleId: number,
    @Param('permissionId') permissionid: number,
  ) {
    return this.roleService.assignPermissionToRole(roleId, permissionid);
  }
}
