const express = require("express");

const app = express();

app.get("/", (req, res, next) => {
  res.send("Welcome");
});

app.listen(8080, () => {
  console.log("Running!");
});
