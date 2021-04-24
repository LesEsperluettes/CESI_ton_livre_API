import { Table, Column, Model, CreatedAt, UpdatedAt, BelongsToMany } from 'sequelize-typescript'
import { Optional } from 'sequelize/types'
import {User} from "./user"
import {UserRole} from "./userRole"

interface RoleAttributes {
  id: number,
  name: string
}

interface RoleCreationAttributes extends Optional<RoleAttributes, 'id'> {}

@Table
export class Role extends Model<RoleAttributes,RoleCreationAttributes> {
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