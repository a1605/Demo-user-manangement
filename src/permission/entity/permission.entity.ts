import { Role } from "src/role/entity/role.entity";
import { CommonColumns } from "src/utils/common.utils";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Url } from "url";
@Entity()
export class Permission extends CommonColumns{
    
    @Column()
    name:string
    @Column()
    url:string
    @ManyToMany(type => Role, role => role.permissions)
    roles: Role[];
}