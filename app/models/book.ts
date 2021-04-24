import { Table, Model, Column, HasOne, DataType } from "sequelize-typescript";
import { Optional } from "sequelize";
import { Borrow } from "./borrow";

interface BookAttributes {
    id: number
    ISBN: string,
    title: string,
    authors: string,
    publishers: string,
    publishedDate: string,
    localisation: string,
    CoverImage: Buffer
}

interface BookCreationAttributes extends Optional<BookAttributes, "id"> {}

@Table
export class Book extends Model<BookAttributes,BookCreationAttributes> {
    @Column
    ISBN!: string

    @Column
    title!: string

    @Column
    authors!: string

    @Column
    publishers!: string

    @Column
    publishedDate!: string

    @Column
    localisation!: string

    @Column
    CoverImage?: Buffer

    @HasOne(() => Borrow)
    borrow!: Borrow
}