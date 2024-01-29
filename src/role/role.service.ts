import { Permissions } from './../permission/permissions.decorator';
import { Repository } from 'typeorm';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entity/role.entity';
import { UpdateRoleDto } from './dto/updateRole.dto';
import { CreateRoleDto } from './dto/createRole.dto';
import { PermissionService } from 'src/permission/permission.service';
import { Permission } from 'src/permission/entity/permission.entity';
import { MAX_NUM, MIN_NUM } from 'constant';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private rolerepo: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepos: Repository<Permission>,
  ) {}
  async getRoles(
    @Query('page') page: number = MIN_NUM,
    @Query('pageSize') pageSize: number = MAX_NUM,
  ) {
    try {
      const [roles, total] = await this.rolerepo.findAndCount({
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

      return {
        data: roles,
        page,
        pageSize,
        total,
      };
    } catch (err) {
      if (err.status) {
        throw err;
      }
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async addrole(createRoleDto: CreateRoleDto) {
    try {
      return await this.rolerepo.save(createRoleDto);
    } catch (err) {
      if (err.status) {
        throw err;
      }
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async updateRolebyId(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      const role = await this.rolerepo.findOne({ where: { id } });
      if (!role) throw new NotFoundException('user not found');

      Object.assign(role, updateRoleDto);
      return this.rolerepo.save(role);
    } catch (err) {
      if (err.status) {
        throw err;
      }
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  async deleteRoleById(id: number) {
    try {
      const role = await this.rolerepo.findOne({ where: { id } });
      if (!role) throw new NotFoundException('role not found');
      this.rolerepo.delete(role);
      return 'Role has been Deleted Successfully';
    } catch (err) {
      if (err.status) {
        throw err;
      }
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  async assignPermissionToRole(roleId: number, permissionId: number) {
    const role = this.rolerepo.findOne({ where: { id: roleId } });
    const permission = this.permissionRepos.findOne({
      where: { id: permissionId },
    });
    if (role && permission) {
      if (!(await role).permissions) {
        (await role).permissions = [];
      }
      const permissionExists = (await role).permissions.some(
        (existingPermission) => existingPermission.id === permissionId,
      );
      if (!permissionExists) {
      }
    }
  }
}
