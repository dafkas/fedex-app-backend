const express = require('express');
const http = require('http').Server(express);
const io = require('socket.io')(http);

const app = express();

app.get('/', (req, res) => {
    res.send('Hello world');
});

module.exports = app;
