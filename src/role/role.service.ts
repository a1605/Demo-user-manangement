import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entity/role.entity';
import { UpdateRoleDto } from './dto/updateRole.dto';
import { CreateRoleDto } from './dto/createRole.dto';


@Injectable()
export class RoleService {
    constructor(@InjectRepository(Role) private rolerepo: Repository<Role>) { }
    getRoles() {
        try{
        return this.rolerepo.find()
    }
    catch (err) {
        if (err.status) {
          throw err;
        }
        throw new HttpException(err, HttpStatus.BAD_REQUEST);
      }
    }
    addrole(createRoleDto:CreateRoleDto) {try{
        return this.rolerepo.save(createRoleDto)}
        catch (err) {
            if (err.status) {
              throw err;
            }
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
          }
    }
    async updateRolebyId(id: number, updateRoleDto: UpdateRoleDto) {
       try {const role = await this.rolerepo.findOne({ where: { id } })
        if (!role)
            throw new NotFoundException('user not found')

        Object.assign(role, updateRoleDto)
        return this.rolerepo.save(role);}
        catch (err) {
            if (err.status) {
              throw err;
            }
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
          }
    }
    async deleteRoleById(id: number) {
       try{ const role = await this.rolerepo.findOne({ where: { id } })
        if (!role)
            throw new NotFoundException('role not found')
        return this.rolerepo.delete(role)}
        catch (err) {
            if (err.status) {
              throw err;
            }
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
          }
    }

}
