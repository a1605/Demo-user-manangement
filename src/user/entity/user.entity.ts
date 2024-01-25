import { Role } from "src/role/entity/role.entity";
import { CommonColumns } from "src/utils/common.utils";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ 'name': 'user' })
export class User extends CommonColumns{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;
    
    @Column()
    password: string;

    @ManyToMany(()=>Role,role=>role.users)
    @JoinTable()
    roles:Role[]

}