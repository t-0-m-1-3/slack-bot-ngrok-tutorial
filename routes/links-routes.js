/*
 * links.js
 * Copyright (C) 2018 t0m <t0m@asuntu>
 *
 * Distributed under terms of the MIT license.
 */
const express = require('express');
const linksRouter = express.Router();
const linksController = require('../controllers/links-controller');

linksRouter.get('/search-a-link', linksController.index);
linksRouter.get('/:id', linksController.show);
linksRouter.post('new', linksController.create);
linksRouter.delete(':id', linksController.destroy);
linksRouter.post('/command', linksController.ngrok);
// linksRouter.post('/moto', linksController.moto);

module.exports = linksRouter;
