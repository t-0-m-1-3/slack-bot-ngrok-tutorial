/*
 * index.js
 * Copyright (C) 2018 t0m <t0m@asuntu>
 *
 * Distributed under terms of the MIT license.
 */


// Import express and request modules
require('dotenv-extended').load();
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const morgan = require('morgan');
//
const pgp = require('pg-promise');
const slackEventsAPI = require('@slack/events-api');
const slackInteractiveMessages = require('@slack/interactive-messages');
const cloneDeep = require('lodash.clonedeep');
const slackLinks = require('./slackLinks.json');
//
// Store our app's ID and Secret. These we got from Step 1.
// For this tutorial, we'll keep your API credentials right here. But for an actual app, you'll want to  store them securely in environment variables.

const TOKEN = process.env.TOKEN;
const clientId = process.env.Slack_ID;
const clientSecret = process.env.Slack_Client_Secret;
const async = require('async');
// Instantiates Express and assigns our app variable to it
const app = express();

// Again, we define a port we want to listen to
const PORT= process.env.PORT;

//middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));

// Lets start our server
app.listen(PORT, () => {
    //Callback triggered when server is successfully listening. Hurray!
    console.log("We got this entry point listening on on port " + PORT);
});


// This route handles GET requests to our root ngrok address and responds with the same "Ngrok is working message" we used before
app.get('/', (req, res) => {
    res.send('Ngrok is working! Path Hit: ' + req.url);
});

// This route handles get request to a /oauth endpoint. We'll use this endpoint for handling the logic of the Slack oAuth process behind our app.
app.get('/oauth', (req, res) => {
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

        }, (error, response, body) => {
            if (error) {
                console.log(error);
            } else {
                res.json(body);

            }
        })
    }
});

// Route the endpoint that our slash command will point to and send back a simple response to indicate that ngrok is working
const linksRouter = require('./routes/links-routes');
app.use('/command,', linksRouter);
// app.post('/command', (req, res) => {
//     res.send('WE GOT THIS! EXCESS MOTIVATION LEVELS++');
// });

app.post('/moto', (req, res) => {
    res.send('Moti moti Gotta lotta motivation Dedi Dedi Gotta Lotta Dedication');
    console.log('moto path hit');
});



app.post('/search-a-link', function(req, res) {
    //
    //
    console.log('entering the link search function block, vars declared');

    const linkSearch = () => {
        const channelName = ['bootcamp', 'general', 'random']
        let ts = 1518973307.000081;
       try {
             // res.send('maybe this fucking works again')
             console.log('what the fuck am i doing with life')
           for (var i = 0, len = channelName.length; i < len; i++) {
         let url = 'htps://slack.com/api/channels.history?token='+TOKEN+'&channel='+channelName[i]+'&count=1000&oldest='+ts
        res.send('search-a-link path hit', url)
            if (slackLinks.Name !== 'fake') {
                  res.send(slackLinks.url[i])
               } else {
                  res.send('this might not be the channelName we are looking for')
                  console.log(channelName[i])
                  console.log('link search function block hit');
                console.log('entering the link search code block, my req  params are: ', req.params)
                console.log('entering the link search code block, my res params are: ', res.params)
               }
           }
       } catch (e) {
           /* handle error */
           console.log(e)
           res.send(e)
           console.log('why is the for loop not running');
       } finally {
           /* be executed regardless of the try / catch result*/
           console.log('finally code block');
       }
    }
    linkSearch();
});

