import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ad } from "./Ad";

@Entity()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ nullable: true })
    name?: string;

    @OneToMany(() => Ad, ad => ad.category)
    ads?: Promise<Ad[]>

    constructor(
        name: string = '',
    ) {
        super()
        this.name = name;
    }
}
