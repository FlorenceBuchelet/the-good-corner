import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";
import { Tag } from "./Tag";

@Entity()
export class Ad extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    description?: string;

    @Column()
    author: string;

    @Column({ nullable: true })
    price?: number;

    @Column({ nullable: true })
    createdAt?: Date;

    @Column({ nullable: true })
    picture?: string;

    @Column({ nullable: true })
    city?: string;

    @ManyToOne(() => Category, category => category.hasId, { eager: true })
    category?: Category;

    @ManyToMany(() => Tag, { cascade: true })
    @JoinTable()
    tags?: Promise<Tag[]>;

    constructor(
        title: string,
        description: string,
        author: string,
        price: number,
        createdAt: Date,
        picture: string,
        city: string,
    ) {
        super();
        this.title = title;
        this.description = description;
        this.author = author;
        this.price = price;
        this.createdAt = createdAt;
        this.picture = picture;
        this.city = city;
    }
}
