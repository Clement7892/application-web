const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const apiRouter = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

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

app.use("/api/v1", apiRouter);
app.use(errorHandler);

app.listen(process.env.PORT, function () {
  console.log(`Server running on port ${process.env.PORT}`);
});
