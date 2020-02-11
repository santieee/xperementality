import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn } from 'typeorm'
import { User } from "../user/user.entity";

@Entity()
export class Token extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(type => User)
  @Column()
  uId: number 

  @Column()
  token: string;

  @Column()
  refreshToken: string;

  @Column()
  fingerPrint: string;

  @CreateDateColumn()
  createdAt: string;
}