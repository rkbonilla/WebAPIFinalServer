// Description: This file is the entry point for the application. It sets up the server and connects to the database.

// import modules
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = require("./config/database");

// set port
const port = process.env.port || process.env.PORT || 3000;

// initialize express
const app = express();

// set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// connect to database
mongoose.connect(db.mongoURI, {
    useNewUrlParser: true
}).then(function () {
    console.log("Connected to MongoDB");
}).catch(function (error) {
    console.log(error);
})

// load models
require("./models/PlayerScores");
const PlayerScores = mongoose.model("PlayerScores");

// default route
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/pages/index.html"));
});

// search for all objects within the PlayerScores collection and send them to the web page
app.get("/api/getPlayerScores", function (req, res) {
    PlayerScores.find().sort({ userScore: -1 }).then(function (scores) {
        res.json(scores);
    }).catch(function (error) {
        res.sendStatus(404);
    })
});

// search for all objects within the PlayerScores collection and send them to unity
// this one is a little different because it returns the entire collection as an object
// then we parse out each object in the collection in unity itself
app.get("/api/getPlayerScoresUnity", function (req, res) {
    PlayerScores.find().sort({ userScore: -1 }).limit(10).then(function (players) {
        res.json({ players });
    }).catch(function (error) {
        res.sendStatus(404);
    })
});

// search for highest score, if no scores exist, send a status 404
app.get("/api/highestScore", function (req, res) {
    PlayerScores.findOne().sort({ userScore: -1 }).then(function (score) {
        if (score) {
            res.json(score);
            console.log(score);
        } else {
            res.sendStatus(404);
        }
    }).catch(function (error) {
        res.sendStatus(404);
    })
});

// insert a new player with their score and print to the console that the player was saved
app.post("/api/savePlayerScore", function (req, res) {
    //console.log(req.body);
    //res.send(req.body);
    new PlayerScores(req.body).save()
        .then(function () {
            console.log("Player saved.");
        })
})

// static files
app.use(express.static(__dirname + "/pages"));

// listening on port
app.listen(port, function () {
    console.log(`Running on port ${port}.`)
})