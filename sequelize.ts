import { Sequelize } from 'sequelize-typescript'

import { Book } from './app/models/book'
import { Borrow } from './app/models/borrow'
import { Role } from './app/models/role'
import { User } from './app/models/user'
import { UserRole } from './app/models/userRole'

export const sequelize = new Sequelize({
  dialect: 'mysql',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  logging: false,
  models: [User, Role, UserRole, Book, Borrow]
});