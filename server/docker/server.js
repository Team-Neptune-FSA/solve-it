const express = require("express");

const app = express();

app.get("/", (req, res, next) => {
  res.send("Welcome");
});

app.listen(8888, () => {
  console.log("Running!");
});
