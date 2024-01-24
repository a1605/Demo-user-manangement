import { User } from "src/user/entity/user.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({'name':'role'})
export class Role{
    @PrimaryGeneratedColumn()
    id :number
    @Column()
    name:string
    @Column()
    slug:string
     
    @ManyToMany(()=>User,user=>user.roles)
    @JoinTable()
    users:User[]


}