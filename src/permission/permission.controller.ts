import { Body, Controller, Delete, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { ResponseInterceptor } from 'src/middleware/middleware.interceptor';

@Controller('permission')
@UseInterceptors(ResponseInterceptor)
export class PermisionController {
  constructor(private permissionService: PermissionService) {}
  @Get('all-permissions')
  async getpermissions() {
    return await this.permissionService.getAllPermission();
  }

  @Post('add-permission')
  async addPermission(@Body() createPermissionDto: CreatePermissionDto) {
    return await this.permissionService.addPermission(createPermissionDto);
  }
  @Delete('delete-permission/:id')
  async deletePermissionById(@Param('id') id: number) {
    return await this.permissionService.deletePermissionById(id);
  }
}
