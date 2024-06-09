const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const config = require("./config");
const apiRouter = require("./routes");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

// parse json request body
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}`
  )
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((err) => console.log(err));

// initial route
app.get("/", (req, res) => {
  res.send({ message: "Welcome to app-store-api application." });
});

// api routes prefix
app.use("/api/v1", apiRouter);

// error handling
app.use(errorHandler);

//run server
app.listen(config.port, () => {
  console.log("Server launch");
});
