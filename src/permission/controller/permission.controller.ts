import { Body, Controller, Get, Post } from '@nestjs/common';
import { PermissionService } from '../service/permission.service';
import { CreatePermissionDto } from '../dto/create-permission.dto';

@Controller('permission')
export class PermisionController {
    constructor(private permissionService:PermissionService){}
    @Get()
    async getpermissions()
    {
        return this.permissionService.getPermissions();

    }
    @Post('add')
    async addPermission(@Body() createPermissionDto:CreatePermissionDto)
    {
        return this.permissionService.addPermission(createPermissionDto)
    }
}
