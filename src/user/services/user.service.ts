import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { Role } from 'src/role/entity/role.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UserService {
    constructor
    (
        @InjectRepository(User) private userRepo: Repository<User>,
     @InjectRepository(Role) private readonly roleRepo: Repository<Role>
     ) { }
    

    async getAllUsers(query) 
    {
      return await this.userRepo.find({where:{username:query.username}});
    }


    async createUser(createUserDTO) 
    {

        const createdUser = await this.userRepo.create(createUserDTO)
        return this.userRepo.save(createdUser)
    }


    async getUserById(id: number)
    {
        //console.log(id)
        return await this.userRepo.findOne({ where: { id } ,relations:['roles']})
        //console.log({id})
    }


    async updateUserDetails(id: number, updateUserDTO: UpdateUserDTO) {
        const user = await this.userRepo.findOne({ where: { id} })
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
      
        Object.assign(user, updateUserDTO)
        return this.userRepo.save(user);
    }


    async deleteById(id:number)
    {
        const user=await this.userRepo.findOne({where :{id}})
        if(!user)
        {
            throw new NotFoundException('User with ${id} does not exist')
        }
        return  this.userRepo.remove(user)
         
    }


   async assignRoleToUser(userId:number,roleId:number)
    {
        const user=await this.userRepo.findOne({where:{id:userId},relations:['roles']})
        const role=await this.roleRepo.findOne({where:{id:roleId}})
       // console.log(user,user.roles)
        if (user) {
            if (!user.roles) {
              user.roles = [];
            }
        
            // Check if the role is not already assigned to the user
            const roleExists = user.roles.some(existingRole => existingRole.id === role.id);
        
            if (!roleExists) {
              user.roles.push(role);
              this.userRepo.save(user);
            }
          }
        return null
    }

      async getUserWithRoles(id: number) 
      {
        return this.userRepo.find({ where: { id }, relations: ['roles'] });
      }

      async findByUsername(username: string): Promise<User | undefined> 
      {
        return this.userRepo.findOne({ where: { username }, relations:['roles']});
      }
    
      
      

}
