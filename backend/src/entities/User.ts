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

    @Column()
    // Pas de Field parce qu'il ne peut pas être requêté
    passwordHashed: string;

    constructor(
        email: string = '',
        role: string = '',
        passwordHashed: string = '',
    ) {
        super();
        this.email = email;
        this.role = role;
        this.passwordHashed = passwordHashed;
    }
}