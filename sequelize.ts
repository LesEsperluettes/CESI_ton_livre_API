import { Sequelize } from 'sequelize-typescript'

export const sequelize = new Sequelize({
  database: process.env.MYSQL_DB,
  port: Number(process.env.MYSQL_PORT),
  dialect: 'mysql',
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  models: [__dirname + '/app/models']
})