import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tag extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name?: string;

    constructor(
        name: string = '',
    ) {
        super()
        this.name = name;
    }
}