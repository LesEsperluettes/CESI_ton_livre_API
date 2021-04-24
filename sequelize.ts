import { Sequelize } from 'sequelize-typescript'
import { Book } from './app/models/book'
import { Borrow } from './app/models/borrow'

import { Role } from './app/models/role'
import { User } from './app/models/user'
import { UserRole } from './app/models/userRole'

export const sequelize = new Sequelize({
  database: process.env.MYSQL_DB,
  port: Number(process.env.MYSQL_PORT),
  dialect: 'mysql',
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  models: [User,Role,UserRole,Book,Borrow]
})