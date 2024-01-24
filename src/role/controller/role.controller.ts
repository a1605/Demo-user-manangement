import { Controller, Get, Post, Delete, Put, Body, Param } from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { CreateRoleDto } from '../dto/createRole.dto';
import { UpdateRoleDto } from '../dto/updateRole.dto';

@Controller('role')
export class RoleController {
    constructor(private roleService :RoleService){}
    @Get()
    async getRoles()
    {
        try
        {
        return this.roleService.getRoles()
        }
        catch (error) 
        {
        console.error(error);
        throw error;
    
        }
    }
    @Post()
    async addrole(@Body()createRoleDto:CreateRoleDto )
    {   try
        {
            return this.roleService.addrole(createRoleDto)
        }
        catch (error) 
        {
          console.error(error);
          throw error;
        
         }
    }
    @Put(':id')
    async updateRolebyId(@Param('id') id ,@Body()updateroleDto:UpdateRoleDto)
    {
        try
        {
       const userId=parseInt(id);
        return this.roleService.updateRolebyId(userId,updateroleDto)
        }
        catch (error) 
        {
          console.error(error);
          throw error;
        
         }
    }
    @Delete(':id')
    async deleteRolebyId(@Param('id')id)
    {
        try
        {
        const userId=parseInt(id)
        return this.roleService.deleteRoleById(userId)
        }
        catch (error) 
        {
          console.error(error);
          throw error;
        
         }
    }
}
