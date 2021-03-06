// import modules
const express = require("express");
const config = require("config");
const app = express();

require("dotenv").config();

const { sequelize } = require("./database/");
require("./models/");

//this DB sync is enabled only in development and test enviroment
if (process.env.NODE_ENV !== "production") {
  sequelize
    .sync({})
    .then(() => {
      console.log(`All Tables synced!`);
      require("./seeds/");
    })
    .catch((err) => {
      console.log(err);
    });
}

const appRoute = require("./routes");

// cors enable
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");

  res.header("Access-Control-Allow-Methods", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// validate the db instance
sequelize
  .authenticate()
  .then(() => {
    console.log(config.get("dbconnectMsg"));
  })
  .catch((err) => {
    console.error(config.get("dbConnectError"), err);
  });

app.get("/", (req, res) => {
  res.send("App has started...");
});
//Middelware for enabling read json body
app.use(express.json());
//Application routes
app.use("/api", appRoute);

app.use((req, res, next) => {
  const error = new Error("Page Not found");
  error.status = 404;
  next(error);
});

//Error Handler for express
app.use((error, req, res, next) => {
  console.log("extttttttt", error);
  res.status(error.status || 500);
  res.json({
    error: error.message,
  });
});

module.exports = app;
