import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ad extends BaseEntity {

    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    private title: string;

    @Column({ nullable: true })
    private description?: string;

    @Column()
    private author: string;

    @Column()
    private price: number;

    @Column()
    private createdAt: Date;

    @Column({ nullable: true })
    private picture?: string;

    @Column()
    private city: string;

    @Column() 
    private category_id?: number;

    constructor(id: number, title: string, author: string, price: number, createdAt: Date, city: string, description?: string, picture?: string, category_id?: number) {
        super();
        this.id = id;
        this.title = title;
        this.description = description;
        this.author = author;
        this.price = price;
        this.createdAt = createdAt;
        this.picture = picture;
        this.city = city;
        this.category_id = category_id;
    }

    
    public getId(): number {
        return this.id;
    }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getAuthor(): string {
        return this.author;
    }

    public setAuthor(author: string): void {
        this.author = author;
    }

    public getPrice(): number {
        return this.price;
    }

    public setPrice(price: number): void {
        this.price = price;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public setCreatedAt(createdAt: Date): void {
        this.createdAt = createdAt;
    }

    public getPicture(): string {
        return this.picture;
    }

    public setPicture(picture: string): void {
        this.picture = picture;
    }

    public getCity(): string {
        return this.city;
    }

    public setCity(city: string): void {
        this.city = city;
    }

    /* public getCategoryId(): number {
        return this.category_id;
    }

    public setCategoryId(category_id: number): void {
        this.category_id = category_id;
    } */
}
