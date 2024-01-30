import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';

@Controller('permission')
export class PermisionController {
  constructor(private permissionService: PermissionService) {}
  @Get()
  async getpermissions() {
    return await this.permissionService.getAllPermission();
  }

  @Post('add')
  async addPermission(@Body() createPermissionDto: CreatePermissionDto) {
    return await this.permissionService.addPermission(createPermissionDto);
  }
  @Delete(':id')
  async deletePermissionById(@Param('id') id: number) {
    return await this.permissionService.deletePermissionById(id);
  }
}
