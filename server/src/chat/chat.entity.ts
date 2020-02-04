import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, JoinColumn, ManyToOne } from 'typeorm'
import { User } from "../user/user.entity";

@Entity()
export class Chat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(type => User, user => user.id)
  @JoinColumn()
  user: User 

  @Column()
  message: string;

  @CreateDateColumn()
  createdAt: string;
}