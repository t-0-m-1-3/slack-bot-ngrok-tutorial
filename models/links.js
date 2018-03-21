/*
 * links.js
 * Copyright (C) 2018 t0m <t0m@asuntu>
 *
 * Distributed under terms of the MIT license.
 */
const db  = require('../db/config');
const Link = {};

// query the db for all the links
Link.findAll = () => {
    return db.any('SELECT links.id, links.url, links.name FROM links ORDER BY links.id DESC;');
};

//query the db for a specific link id
Link.findById = (id) => {
    console.log('inside find by id');
    console.log(db);
    return db.one(`SELECT links.id, links.url, links.name FROM links WHERE links.id = $1`, [id]);

//query the DB and create a link
Link.create = (links) => {
    return db.one(
    `
    INSERT INTO links
    (links.id, links.url, links.name)
    VALUES ($1, $2, $3) RETURNING *
    `,
    [links.id, links.url, links.name]);
};

//query the db and delete a link
Link.destroy = (id) => {
    return db.none(
        `
        DELETE FROM links
        WHERE id = $1
        `, [id]);
};

module.exports = Link;
