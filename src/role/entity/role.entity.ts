import { Permission } from "src/permission/entity/permission.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/user/entity/user.entity";
import { CommonColumns } from "src/utils/common.utils";

@Entity({'name':'role'})
export class Role extends CommonColumns{
    @PrimaryGeneratedColumn()
    id :number
    @Column()
    name:string
    
     
    @ManyToMany(()=>User,user=>user.roles)
    users:User[]


}