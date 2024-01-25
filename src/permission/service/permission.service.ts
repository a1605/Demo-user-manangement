import { Permission } from './../entity/permission.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
//import { Permission} from '../entity/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PermissionService {
constructor(@InjectRepository(Permission) private permissionRepos:Repository<Permission>){}
    async getPermissions()
    {
       return  this.permissionRepos.find()
    }
    async addPermission(createPermissionDto)
    {
        return this.permissionRepos.save(createPermissionDto)
    }
}
