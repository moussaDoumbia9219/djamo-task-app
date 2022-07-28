import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column()
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdDate: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedDate: Date;
}
