import path from 'path';
import dotenv from 'dotenv';

let envPath = '';
switch (process.env.ENVIRONMENT) {
  case 'db':
  case 'prod':
  case 'dev': envPath = './.env'; break;
  case 'test': envPath = './.env.test'; break;
  default: console.log('ENV ERROR : Please check if the ENVIRONNEMENT variable is configured !'); process.exit(1);
}
dotenv.config({ path: path.resolve(__dirname, envPath) });

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import authRoute from './app/routes/auth.routes';
import userRoute from './app/routes/user.routes';
import bookRoute from './app/routes/book.routes';

import { sequelize } from "./sequelize";

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.ENVIRONMENT === "db") {
  const seeder = require("./app/seeders");

  sequelize.sync({ force: true }).then(async () => {
    console.log('[DB GENERATE] Drop, seed and Resync Db');
    await seeder.seed();
    console.log('[DB GENERATE] Done')
    process.exit(0);
  });
} else {
  sequelize.sync();
}

// simple route
app.get("/", (req: any, res: any) => {
  res.json({ message: "Welcome to CESI ton livre API." });
});

// Advanced routes
authRoute(app);
userRoute(app);
bookRoute(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT,() => {
  console.log(`Server is running on port ${PORT}.`);
});

export default app;

