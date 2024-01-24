import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entity/user.entity';
import { CreateUserdto } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/role/entity/role.entity';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
    constructor(private userservice: UserService) { }
        @Get()
        async findAllUsers(@Query()query :string)
        {
          try 
          {
                return this.userservice.getAllUsers(query);
          
          }
           catch (error) 
          {
            console.error(error);
            throw error;
          
           }
           
        }
        
        @Post('add')
        @Roles('admin')
        @UseGuards(JwtAuthGuard,RolesGuard)
        async createUser(@Body() createUserDTO: CreateUserdto,@Req() req:any) 
        {

         try{
             this.userservice.createUser(createUserDTO)
            }  
        catch (error) 
            {
              console.error(error);
              throw error;
            
             }
        }
        @Get(':id')
        async getUserById(@Param('id') id:string)
        {
          try
          {
            const userId=parseInt(id)
            const user=await this.userservice.getUserById(userId)
             if (!user) 
             {
               throw new NotFoundException(`User with ID ${id} not found`);
             }
               return user;
            }
            catch (error) 
            {
              console.error(error);
              throw error;
            
             }
        }
        @Put(':id')
       async updateUserDetails(@Param('id')id :string,@Body()updateUserDTO:UpdateUserDTO)
        {
           try
           { const userId=parseInt(id);
            return this.userservice.updateUserDetails(userId,updateUserDTO)
           }
           catch (error) 
           {
             console.error(error);
             throw error;
           
            }

        }
        @Delete(':id')
        async deleteUserById(@Param('id') id:string)
        {
          try
          {
           const userId=parseInt(id)
           return this.userservice.deleteById(userId);
          }
          catch (error) 
          {
            console.error(error);
            throw error;
          
           }
        }


        @Post(':userId/assign/:roleId')
        async assignRoleToUser(@Param('userId') userId,@Param('roleId') roleId)
        {
          try
          {
              const user_Id=parseInt(userId)
              const role_Id=parseInt(roleId)
              this.userservice.assignRoleToUser(user_Id,role_Id)}
          catch (error) 
          {
            console.error(error);
            throw error;
          
           }

        }
        @Get('getRoles/:userId')
        async getUserWithRoles(@Param('userId')userId)
        {
          try
          {
          const user_Id=parseInt(userId)
          return this.userservice.getUserWithRoles(user_Id)
          }
          catch (error) 
          {
            console.error(error);
            throw error;
          
           }

        }
        


}

