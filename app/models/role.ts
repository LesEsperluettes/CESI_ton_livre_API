import { Table, Column, Model, HasMany, CreatedAt, UpdatedAt, BelongsToMany } from 'sequelize-typescript'
import {User} from "./user"
import {UserRole} from "./userRole"

@Table
export class Role extends Model {
  @Column
  name!: string

  @BelongsToMany(() => User, () => UserRole)
  users?: User[]

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}