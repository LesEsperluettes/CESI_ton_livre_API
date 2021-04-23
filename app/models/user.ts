import { Table, Column, Model, CreatedAt, UpdatedAt, BelongsToMany } from 'sequelize-typescript'
import { Role } from './role'
import { UserRole } from './userRole'

@Table
export class User extends Model {
  @Column
  username!: string

  @Column
  email!: string

  @Column
  password!: string

  @BelongsToMany(() => Role, () => UserRole)
  roles?: User[]

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
