import { CategoryEntity } from 'src/modules/categories/entities/category.entity';
import { ReviewEntity } from 'src/modules/reviews/entities/review.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column()
  stock: number;

  @Column('simple-array')
  images: string[];

  @CreateDateColumn()
  created_at: Timestamp;

  @UpdateDateColumn()
  updated_at: Timestamp;

  @DeleteDateColumn({ select: false })
  deleted_at: Timestamp;

  @ManyToOne(() => UserEntity, (user) => user.products)
  @JoinColumn({ name: 'added_by_id' })
  added_by: UserEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @OneToMany(() => ReviewEntity, (review) => review.product)
  reviews: ReviewEntity[];
}
