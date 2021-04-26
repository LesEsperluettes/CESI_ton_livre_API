import { BelongsTo, Column, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { Optional } from "sequelize";
import { Book } from "./book";
import { User } from "./user";

interface BorrowAttributes {
    id: number,
    borrowDate: Date,
    duration: number
}

interface UserCreationAttributes extends Optional<BorrowAttributes, 'id'> {}

@Table
export class Borrow extends Model<BorrowAttributes,UserCreationAttributes> {
    @Column
    borrowDate!: Date

    @Column
    duration!: number

    @ForeignKey(() => User)
    @Column
    userId!: number

    @ForeignKey(() => Book)
    @Column
    bookId!: number

    @BelongsTo(() => User)
    user!: User

    @BelongsTo(() => Book)
    book!: Book
}