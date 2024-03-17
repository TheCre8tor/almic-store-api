import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Roles } from '../utilities/user-roles.enum';

@Entity('users')
export class UserEntity {
  @PrimaryColumn({ primaryKeyConstraintName: 'pk_user_id' })
  id: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Roles,
    array: true,
    default: [Roles.USER],
  })
  roles: Roles;
}
