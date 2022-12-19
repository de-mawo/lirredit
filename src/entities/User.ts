// import {OptionalProps, PrimaryKey, Property } from "@mikro-orm/core";
import { Field,  ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./Post";
import { Updoot } from "./Updoot";



@ObjectType()
@Entity()
export class User extends BaseEntity {

  // [OptionalProps]?: "title" | "updatedAt" | "createdAt";

  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  
  @Field()
  @Column({ unique: true})
  username!: string;
  
  @Field()
  @Column({  unique: true})
  email!: string;
  
  @Column({ type: "text"})
  password!: string;

  @OneToMany(() => Post, (post) => post.creator)
    posts: Post[]
  
    
  @OneToMany(() => Updoot, (updoot) => updoot.user)
  updoots: Updoot[] 

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
  
}