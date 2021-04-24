import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import 'dotenv/config'

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

if(process.env.PRODUCTION){
    const seeder = require("./app/seeders");

    sequelize.sync({force: true}).then(() => {
        console.log('Drop, seed and Resync Db');
        seeder.seed();
    });
}else{
    sequelize.sync();
}

// simple route
app.get("/", (req: any, res: any) => {
  res.json({ message: "Welcome to CESI ton livre API." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});