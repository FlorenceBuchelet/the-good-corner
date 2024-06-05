import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";

@Entity()
export class Cyril extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({ length: 100 })
    title: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    location: string;

    @Column()
    imageUrl?: string;

    @ManyToOne(() => Category, category => category.hasId, { eager: true })
    category?: Category;

        constructor(title: string, description: string, price: number, location: string, imageUrl: string) {
            super();
            this.title = title;
            this.description = description;
            this.price = price;
            this.location = location;
            this.imageUrl = imageUrl;
        }
}