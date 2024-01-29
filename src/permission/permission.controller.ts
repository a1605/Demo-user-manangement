import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';

@Controller('permission')
export class PermisionController {
  constructor(private permissionService: PermissionService) {}
  @Get()
  async getpermissions() {
    await this.permissionService.getAllPermission();
  }

  @Post('add')
  async addPermission(@Body() createPermissionDto: CreatePermissionDto) {
    await this.permissionService.addPermission(createPermissionDto);
  }
  @Delete(':id')
  async deletePermissionById(@Param('id') id: number) {
    await this.permissionService.deletePermissionById(id);
  }
}
