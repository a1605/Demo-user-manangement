import { UpdateRoleDto } from './../dto/updateRole.dto';
import { CreateRoleDto } from './../dto/createRole.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entity/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
    constructor(@InjectRepository(Role)private rolerepo:Repository<Role>){}
    getRoles()
    {
        return this.rolerepo.find()
    }
    addrole(createRoleDto)
    {
        return this.rolerepo.save(createRoleDto)
    }
    async updateRolebyId(id:number,updateRoleDto:UpdateRoleDto)
    {
        const role=await this.rolerepo.findOne({where:{id}})
        if(!role)
        throw new NotFoundException('user not found')

        Object.assign(role,updateRoleDto)
        return this.rolerepo.save(role);
    }
   async deleteRoleById(id :number)
    {const role =await this.rolerepo.findOne({where:{id}})
    if(!role)
    throw new NotFoundException('role not found')
        return this.rolerepo.delete(role)
    }

}
