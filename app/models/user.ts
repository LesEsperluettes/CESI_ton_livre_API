import { Table, Column, Model, CreatedAt, UpdatedAt, BelongsToMany, HasMany } from 'sequelize-typescript'
import { Optional } from 'sequelize/types'
import { Borrow } from './borrow'
import { Role } from './role'
import { UserRole } from './userRole'

interface UserAttributes {
  id: number,
  username: string,
  email: string,
  password: string
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

@Table
export class User extends Model<UserAttributes,UserCreationAttributes> {
  @Column
  username!: string

  @Column
  email!: string

  @Column
  password!: string

  @BelongsToMany(() => Role, () => UserRole)
  roles?: Role[]

  @HasMany(() => Borrow)
  borrows?: Borrow[]

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
