import { Sequelize } from 'sequelize-typescript'

import { Book } from './app/models/book'
import { Borrow } from './app/models/borrow'
import { Role } from './app/models/role'
import { User } from './app/models/user'
import { UserRole } from './app/models/userRole'

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  database: process.env.DB_NAME,
  storage: process.env.DB_STORAGE,
  logging: false,
  models: [User, Role, UserRole, Book, Borrow]
});