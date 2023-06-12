const mysql = require("mysql2/promise");
require("dotenv").config();

const db = mysql.createConnection(
    {
        host: "127.0.0.1",
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME,
    },
    console.log("Connected to database!")
);

module.exports = db;