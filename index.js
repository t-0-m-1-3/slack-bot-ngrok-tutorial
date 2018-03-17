/*
 * index.js
 * Copyright (C) 2018 t0m <t0m@asuntu>
 *
 * Distributed under terms of the MIT license.
 */

/*
 * server.js
 * Copyright (C) 2017 t0m <t0m@asuntu>
 *
 * Distributed under terms of the MIT license.
 */
// Import express and request modules
require('dotenv-extended').load();
const express = require('express');
const request = require('request');
const slackLinks = require('./slackLinks.json');
// Store our app's ID and Secret. These we got from Step 1.
// For this tutorial, we'll keep your API credentials right here. But for an actual app, you'll want to  store them securely in environment variables.

const clientId = process.env.Slack_ID;
const clientSecret = process.env.Slack_Client_Secret;
const fs = require('fs');
const parse = require('csv-parse');
const async = require('async');
const inputFile= './SlackLinks - Links.csv';
const builder = require('botbuilder');
const connector = new builder.ConsoleConnector().listen();
const bot = new builder.UniversalBot(connector, function (session) {
	session.send("You said: %s", session.message.text);
});
// Instantiates Express and assigns our app variable to it
const app = express();

// const parser = parse({delimiter: ','}, function (err, data) {
//   async.eachSeries(data, function (line, callback) {
//     // do something with the line
//     // doSomething(line).then(function() {
//       // when processing finishes invoke the callback to move to the next one
//       // callback();
//     });
//   })
// });
// fs.createReadStream(inputFile).pipe(parser);

// Again, we define a port we want to listen to
const PORT= process.env.PORT;

// Lets start our server
app.listen(PORT, function () {
    //Callback triggered when server is successfully listening. Hurray!
    console.log("We got this entry point listening on on port " + PORT);
});


// This route handles GET requests to our root ngrok address and responds with the same "Ngrok is working message" we used before
app.get('/', function(req, res) {
    res.send('Ngrok is working! Path Hit: ' + req.url);
});

// This route handles get request to a /oauth endpoint. We'll use this endpoint for handling the logic of the Slack oAuth process behind our app.
app.get('/oauth', function(req, res) {
    // When a user authorizes an app, a code query parameter is passed on the oAuth endpoint. If that code is not there, we respond with an error message
    if (!req.query.code) {
        res.status(500);
        res.send({"Error": "Looks like we're not getting code."});
        console.log("Looks like we're not getting code.");
    } else {
        // If it's there...

        // We'll do a GET call to Slack's `oauth.access` endpoint, passing our app's client ID, client secret, and the code we just got as query parameters.
        request({
            url: 'https://slack.com/api/oauth.access', //URL to hit
            qs: {code: req.query.code, client_id: clientId, client_secret: clientSecret}, //Query string data
            method: 'GET', //Specify the method

        }, function (error, response, body) {
            if (error) {
                console.log(error);
            } else {
                res.json(body);

            }
        })
    }
});

// Route the endpoint that our slash command will point to and send back a simple response to indicate that ngrok is working
app.post('/command', function(req, res) {
    res.send('WE GOT THIS! EXCESS MOTIVATION LEVELS++');
});

app.post('moto', function(req, res) {
    res.send('Moti moti Gotta lotta motivation Dedi Dedi Gotta Lotta Dedication');
});

app.post('/search-a-link', function(req, res) {
    res.send('search-a-link path hit');
    // res.send(slackLinks);
    // res.send(slackLinks.slice(0,10));
});
