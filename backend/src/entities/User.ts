import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    @Field(type => ID)
    id?: number;

    @Column()
    @Field()
    email: string;

    @Column()
    @Field()
    role: string;

    @Column({ default: 0 })
    @Field()
    stars?: number;

    @Column()
    passwordHashed: string;

    constructor(
        email: string = '',
        role: string = '',
        passwordHashed: string = '',
        stars: number = 0,
    ) {
        super();
        this.email = email;
        this.role = role;
        this.passwordHashed = passwordHashed;
        this.stars = stars;
    }
}