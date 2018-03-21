/*
 * 03112018-migrations.sql
 * Copyright (C) 2018 t0m <t0m@asuntu>
 *
 * Distributed under terms of the MIT license.
 */
 
\c codingblocks
DROP TABLE IF EXISTS links;
CREATE TABLE IF NOT EXISTS links(
       id SERIAL PRIMARY KEY,
       URL  VARCHAR(508) 
      ,Name VARCHAR(255)
    );
-- vim:et

