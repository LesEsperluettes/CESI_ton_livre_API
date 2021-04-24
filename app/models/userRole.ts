import { Table, Column, Model, ForeignKey } from 'sequelize-typescript'
import {User} from "./user"
import {Role} from "./role"

@Table
export class UserRole extends Model {
    @ForeignKey(() => User)
    @Column
    userId!: number

    @ForeignKey(() => Role)
    @Column
    roleId!: number
}