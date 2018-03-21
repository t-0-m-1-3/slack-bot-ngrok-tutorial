/*
 * config.js
 * Copyright (C) 2018 t0m <t0m@asuntu>
 *
 * Distributed under terms of the MIT license.
 */
const options = {
    receive: (data, result, e) => {
        console.log('this is from the receive :', e.query);
    },
    query: (e) => {
        console.log('this is the e.query: ', e.query);
    }
};

const pgp = require('pg-promise')(options);
const PW = process.env.PGPASSWORD
function setDatabase(){
    if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
        console.log(process.env.NODE_ENV);
        console.log('this is after the process.env.NODE_ENV');
       return pgp({
           database: 'coding-blocks',
           port:5432,
           host: 'localhost',
           password: PW
       });
    } else if (process.env.NODE_ENV === 'production') {
        return pgp(process.env.DATABSE_URL);
    }
const db = setDatabase;

module.exports = db;
