import { Role } from 'src/role/entity/role.entity';

import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonColumns } from 'utils';

@Entity({ name: 'user' })
export class User extends CommonColumns{
  @Column({ unique: true })
  username: string;

  @Column({select: false})
  password: string;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];
}
