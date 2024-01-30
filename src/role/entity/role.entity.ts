import { Roles } from 'src/auth/roles.decorator';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/user/entity/user.entity";
import { Permission } from 'src/permission/entity/permission.entity';
import { CommonColumns } from 'utils';


@Entity({'name':'role'})
export class Role extends CommonColumns{
   
    @Column()
    name:string
    
     
    @ManyToMany(()=>User,user=>user.roles)
    users:User[]

  @ManyToMany(type => Permission, permission => permission.roles)
  @JoinTable()
  permissions: Permission[];

}