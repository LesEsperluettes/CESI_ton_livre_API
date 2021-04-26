# CESI ton livre API
Node.js / Mysql API for "CESI ton livre" Android app backend.

# Requirements
* NodeJS
* npm or yarn package manager
* mysql database

# How to install
1. Clone the repo & open the repo folder
2. `cp .env.example .env` and edit `.env` with your config
3. create your database in mysql (with the name in .env)
4. `yarn db_generate` or `npm run db_generate`
5. `yarn dev` or `npm run dev`

# Credits
* Highly inspired by : https://bezkoder.com/node-js-jwt-authentication-mysql/