import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Url } from "url";
@Entity()
export class Permission{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    name:string
    @Column()
    url:string
}