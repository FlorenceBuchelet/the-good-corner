class Ads {
    #id: number;
    #title: string;
    #description?: string;
    #author: string;
    #price: number;
    #createdAt: Date;
    #picture?: string;
    #city: string;
    #category_id?: number;

    constructor(title: string, author: string, price: number, createdAt: Date, city: string, description?: string, picture?: string, category_id?: number) {
        this.#title = title;
        this.#description = description;
        this.#author = author;
        this.#price = price;
        this.#createdAt = createdAt;
        this.#picture = picture;
        this.#city = city;
        this.#category_id = category_id;
    }

    get title() {
        return this.#title;
    };
    get description() {
        return this.#description;
    };
    get author() {
        return this.#author;
    };
    get price() {
        return this.#price;
    };
    get createdAt() {
        return this.#createdAt;
    };
    get picture() {
        return this.#picture;
    };
    get city() {
        return this.#city;
    };
    get category_id() {
        return this.#category_id;
    };

}