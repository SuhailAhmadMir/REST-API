const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyPareser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

//middleware for body-parser to parse json data
app.use(cors());
app.use(bodyPareser.json());

//Import Routes
const postsRoute = require("./routes/posts");

//Using routes in middleware
app.use("/posts", postsRoute);

//Routes
app.get("/", (req, res) => {
  res.send("We are on homepage");
});

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("connected to DB!!");
});

//How do we start listening to the server
app.listen(3000);
