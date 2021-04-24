import { Table, Model, Column, PrimaryKey, HasOne } from "sequelize-typescript";
import { Optional } from "sequelize";
import { Borrow } from "./borrow";

interface BookAttributes {
    ISBN: number,
    title: string,
    authors: string[],
    publishers: string[],
    publishedDate: Date,
    localisation: string,
    CoverImage: string
}

interface BookCreationAttributes extends Optional<BookAttributes, "ISBN"> {}

@Table
export class Book extends Model<BookAttributes,BookCreationAttributes> {
    @Column
    @PrimaryKey
    ISBN!: number

    @Column
    title!: string

    @Column
    authors!: string[]

    @Column
    publishers!: string[]

    @Column
    publishedDate!: Date

    @Column
    localisation!: string

    @Column
    CoverImage?: string

    @HasOne(() => Borrow)
    borrow!: Borrow
}