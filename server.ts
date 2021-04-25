import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import dotenv from 'dotenv';
import path from 'path';

let envPath = '';
switch(process.env.ENVIRONMENT){
  case 'prod':
  case 'dev': envPath = './.env'; break;
  case 'test': envPath = './.env.test'; break;
  default: console.log('ENV ERROR : Please check if the ENVIRONNEMENT variable is configured !'); process.exit(1);
}

dotenv.config({ path: path.resolve(__dirname, envPath)});


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

if(process.env.ENVIRONMENT === "dev" || process.env.ENVIRONMENT === "test"){
    const seeder = require("./app/seeders");

    sequelize.sync({force: true}).then(() => {
        console.log('Drop, seed and Resync Db');
        seeder.seed();
    });
}else {
    sequelize.sync();
}

// simple route
app.get("/", (req: any, res: any) => {
  res.json({ message: "Welcome to CESI ton livre API." });
});

// Advanced routes
import authRoute from './app/routes/auth.routes';
import userRoute from './app/routes/user.routes';
import bookRoute from './app/routes/book.routes';
authRoute(app);
userRoute(app);
bookRoute(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

export default app;