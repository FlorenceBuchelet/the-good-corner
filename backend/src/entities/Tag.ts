import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Tag extends BaseEntity {

    @PrimaryGeneratedColumn()
    @Field(type => ID)
    id?: number;

    @Column()
    @Field()
    name: string;

    constructor(
        name: string = '',
    ) {
        super();
        this.name = name;
    }
}