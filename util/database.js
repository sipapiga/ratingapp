const express = require('express');
const router = express.Router();
const dotenv = require("dotenv");
const yelp = require('yelp-fusion');
const mysql = require('mysql');

dotenv.config();
const client = yelp.client(process.env.API_KEY);

const db = mysql.createConnection({
    host: 'atlas.dsv.su.se',
    port: '3306',
    user: 'usr_16453842',
    password: '453842',
    database: 'db_16453842'
});

db.connect(function (err) {
    if (err) {
        console.error('Error:- ' + err.stack);
        return;
    }
    console.log('MySql Connected...');
});

/* let sqlDB = 'CREATE DATABASE IF NOT EXISTS RESTAURANGRATING';
db.query(sqlDB, (err, result) => {
    if (err) throw err;
    console.log(result);
}) */

/* let useDB = ' USE RESTAURANGRATING';
db.query(useDB, (err, result) => {
    if (err) throw err;
    console.log(result);
}) */

let sqltable = 'CREATE TABLE IF NOT EXISTS restaurang(id int(5) NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL,location varchar(255) NOT NULL, price varchar(255) , rating int(20) NOT NULL,review  varchar(255) ,image varchar(255) NOT NULL,url varchar(255) NOT NULL,phonenumber  varchar(255)  NOT NULL,category  varchar(255)  NOT NULL,PRIMARY KEY (id))';
db.query(sqltable, (err, result) => {
    if (err) throw err;
    console.log(result);
});

let sqltableReview = 'CREATE TABLE IF NOT EXISTS review(id int(5) NOT NULL AUTO_INCREMENT,name varchar(255),review varchar(255) NOT NULL,restaurang_id int ,rating int(20) NOT NULL, PRIMARY KEY (id))';
db.query(sqltableReview, (err, result) => {
    if (err) throw err;
    console.log(result);
});

let sqltableUser = 'CREATE TABLE IF NOT EXISTS user(id int(5) NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL,email varchar(255) NOT NULL, username varchar(255) , password  varchar(255)  NOT NULL,PRIMARY KEY (id))';
db.query(sqltableUser, (err, result) => {
    if (err) throw err;
    console.log(result);
});
/*
client.search({
    term: 'restaurang',
    limit: 15,
    location: 'stockholm',
}).then(response => {
    let datas = response.jsonBody.businesses;
    for (data of datas) {
        console.log(data.name);
        //   console.log(data);
        let sql = 'INSERT INTO restaurang SET ?';
        const restaurang = {
            name: data.name,
            price: data.price,
            rating: data.rating,
            image: data.image_url,
            url: data.url,
            phonenumber: data.display_phone,
            location: data.location.address1,
            category: data.categories[0].title
        };


        db.query(sql, restaurang, (err, result) => {
            if (err) throw err;
            console.log(result);
            //  res.send('Restaurang inserted...')
        });
    }
}).catch(e => {
    console.log(e);
}); */

module.exports = db;