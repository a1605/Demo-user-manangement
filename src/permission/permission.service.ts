import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MAX_NUM, MIN_NUM } from 'constant';
import { Permission } from './entity/permission.entity';
import { Role } from 'src/role/entity/role.entity';
import { skipCount } from 'utils';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}
  async getAllPermission(
    @Query('page') page: number = MIN_NUM,
    @Query('limit') limit: number = MAX_NUM,
  ) {
    try {
      const offset=skipCount(page,limit);
      const [permissions, totalCount] = await this.permissionRepository.findAndCount(
        {
          skip: offset,
          take: limit,
        },
      );

      return {
        results:[permissions],
        page,
        limit,
        totalCount,
      };
    } catch (err) {
      if (err.status) {
        throw err;
      }
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  async addPermission(createPermissionDto) {
    try {
      await this.permissionRepository.save(createPermissionDto);
      return 'Permission has been created Successfully';
    } catch (err) {
      if (err.status) {
        throw err;
      }
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  async getPermissionsForRole(roleName: string) {
    const role = await this.roleRepository.findOne({
      where: { name: roleName },
      relations: ['permissions'],
    });
    return role ? role.permissions : [];
  }
  async deletePermissionById(id: number) {
    try {
      const user = await this.permissionRepository.findOne({ where: {id} });
      if (!user) {
        throw new NotFoundException('Permission does not exist');
      }
      this.permissionRepository.remove(user);
      const returnStatement = 'Permission has been deleted';
      return returnStatement;
    } catch (err) {
      if (err.status) {
        throw err;
      }
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
