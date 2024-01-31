import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/role/entity/role.entity';
import * as bcrypt from 'bcrypt';
import { CreateUpdateUserDto } from './dto/createUpdate-user.dto';
import { MAX_NUM, MIN_NUM } from 'constant';
import { skipCount } from 'utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
  ) {}

  async getAllUsers(
    @Query('page') page: number = MIN_NUM,
    @Query('limit') limit: number = MAX_NUM,
  ) {
    try {
      const offset=skipCount(page,limit);
      const [users, totalCount] = await this.userRepo.findAndCount({
        skip: offset,
        take: limit,
      });

      return {
        results: users,
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
  async createUser(createUserDTO) {
    try {
      const { username, password } = createUserDTO;
      const hashedPassword = await bcrypt.hash(password, 10);
      const createdUser = this.userRepo.create({
        username,
        password: hashedPassword,
      });
      this.userRepo.save(createdUser);
      return 'User has been created successfully';
    } catch (err) {
      if (err.status) {
        throw err;
      }
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserById(id: number) {
    try {
      return await this.userRepo.findOne({
        where: { id },
        relations: ['roles'],
      });
    } catch (err) {
      if (err.status) {
        throw err;
      }
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async updateUserDetails(id: number, updateUserDTO: CreateUpdateUserDto) {
    try {
      const user = await this.userRepo.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User does not found`);
      }

      Object.assign(user, updateUserDTO);
      await this.userRepo.save(user);
      return 'User Details has been Updated successfully';
    } catch (err) {
      if (err.status) {
        throw err;
      }
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteById(id: number) {
    try {
      const user = await this.userRepo.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException('User does not exist');
      }
      this.userRepo.remove(user);
      return 'User has been deleted successfully';
    } catch (err) {
      if (err.status) {
        throw err;
      }
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async assignRoleToUser(userId: number, roleId: number) {
    try {
      const user = await this.userRepo.findOne({
        where: { id: userId },
        relations: ['roles'],
      });
      const role = await this.roleRepo.findOne({ where: { id: roleId } });
      if (!user || !role) {
        throw new NotFoundException('User or Role not found');
      }

      if (user && role) {
        if (!user.roles) {
          user.roles = [];
        }

        const roleExists = user.roles.some(
          (existingRole) => existingRole.id === role.id,
        );

        if (!roleExists) {
          user.roles.push(role);
          this.userRepo.save(user);
        }
        return 'Role has been assigned successfully';
      }
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findByUsername(username: string): Promise<User | undefined> {
    try {
      const user = this.userRepo.findOne({
        where: { username },
        relations: ['roles'],
      });
      if (!user) throw new NotFoundException('User does not found');
      return user;
    } catch (err) {
      if (err.status) {
        throw err;
      }
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
