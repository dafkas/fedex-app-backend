const express = require("express");
var http = require("http").Server(express);
var io = require("socket.io")(http);

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});

module.exports = app;
