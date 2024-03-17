import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { Roles } from '../utilities/user-roles.enum';
import { OmitType, PartialType } from '@nestjs/mapped-types';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'pk_user_id' })
  id: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({
    type: 'enum',
    enum: Roles,
    array: true,
    default: [Roles.USER],
    select: false,
  })
  roles: Roles;

  @CreateDateColumn()
  created_at: Timestamp;

  @UpdateDateColumn()
  updated_at: Timestamp;

  @DeleteDateColumn({ select: false })
  deleted_at: Timestamp;

  @BeforeInsert()
  generateUsername() {
    this.username = this.name.slice(0, 2) + 'XYZ';
  }
}
