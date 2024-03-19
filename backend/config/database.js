// config file to connect to MySQL database
const express = require("express");
const mysql = require("mysql");

const databaseConfig = {
    // Host
    host: "trashly-database.c7qiiqk028c1.ap-south-1.rds.amazonaws.com",
    user: "admin",
    password: "12345678",
    database: "trashlydatabase",
    connectionLimit: 10,
};

const connection = mysql.createConnection(databaseConfig);

module.exports = connection;