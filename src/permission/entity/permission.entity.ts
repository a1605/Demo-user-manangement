import { Role } from 'src/role/entity/role.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Url } from 'url';
import { CommonColumns } from 'utils';
@Entity()
export class Permission extends CommonColumns {
  @Column()
  name: string;
  @Column()
  url: string;
  @Column()
  method: string;
  @ManyToMany((type) => Role, (role) => role.permissions)
  roles: Role[];
}
