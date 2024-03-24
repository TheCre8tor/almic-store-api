import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { Roles } from '../utilities/user-roles.enum';
import { CategoryEntity } from 'src/modules/categories/entities/category.entity';
import { ProductEntity } from 'src/modules/products/entities/product.entity';

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
  })
  roles: Roles;

  @CreateDateColumn()
  created_at: Timestamp;

  @UpdateDateColumn()
  updated_at: Timestamp;

  @DeleteDateColumn({ select: false })
  deleted_at: Timestamp;

  @OneToMany(() => CategoryEntity, (category) => category.added_by, {
    cascade: ['remove'],
  })
  categories: CategoryEntity[];

  @OneToMany(() => ProductEntity, (product) => product.added_by)
  products: ProductEntity[];

  @BeforeInsert()
  generateUsername() {
    this.username = this.name.slice(0, 2) + 'XYZ';
  }
}
