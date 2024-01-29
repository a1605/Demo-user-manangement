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
import { CreateUpdateRoleDto } from './dto/createUpdateRole.dto';
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

  async addrole(createRoleDto: CreateUpdateRoleDto) {
    try {
      return await this.rolerepo.save(createRoleDto);
    } catch (err) {
      if (err.status) {
        throw err;
      }
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async updateRolebyId(id: number, updateRoleDto: CreateUpdateRoleDto) {
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
    try {
      const role = await this.rolerepo.findOne({ where: { id: roleId } });
      const permission = await this.permissionRepos.findOne({
        where: { id: permissionId },
      });
      if (!role || !permission) {
        throw new NotFoundException('Permission or Role not found');
      }

      if (role && permission) {
        if (!role.permissions) {
          role.permissions = [];
        }
        const permissionExists = role.permissions.some(
          (existingPermission) => existingPermission.id === permissionId,
        );
        if (!permissionExists) {
          role.permissions.push(permission);
          await this.rolerepo.save(role);
        }
        return 'Permission has been successfully assigned ';
      }
    } catch (err) {
      if (err.status) {
        throw err;
      }
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
