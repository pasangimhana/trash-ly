const express = require("express");
const connection = require("./config/database");
const saveImage = require("./controllers/imageController");
const {createUser, getUser, addPoints, getPoints} = require("./controllers/userController");
const { getLeaderboard} = require("./controllers/leaderboardController");


connection.connect((err) => {
    if (err) {
        console.log("Error connecting to database");
    } else {
        console.log("Connected to database");
    }
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// create,get and add points to user
app.post("/user/create", (req, res) => { createUser(req, res) });   // Tested
app.get("/user", (req, res) => { getUser(req, res) });  // Tested
app.put("/user/addPoints", (req, res) => { addPoints(req, res) });  // Tested
app.post("/user/getPoints", (req, res) => { getPoints(req, res) }); // Tested

// get the current leaderboard
app.get("/leaderboard", (req, res) => {
    getLeaderboard(req, res);   //  Tested
})



// save image
app.post("/saveImage", (req, res) => { saveImage(req, res) });

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    // show how to connect using URL
    console.log(`http://localhost:${port}/`);
});