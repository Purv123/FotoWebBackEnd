const express = require("express");

const app = express();

var uploadRouter = require('./upload');


//calling upload router
app.use('/uploads', uploadRouter);


app.get("/getLogs", (req, res) => {
  console.log("Hello");
  res.end();
});

module.exports = app;
