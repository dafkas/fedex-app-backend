const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('../routes');
const session = require('express-session');
const errorHandlers = require('../handlers/errorHandlers');

// init app
const app = express();

// Set public folder
app.use(express.static(path.join(__dirname, '../public')));

// Express Session Middleware
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    })
);

// global variables
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

// parse application/x-www-form-urlencoded
// parse application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Handle routes
app.use('/', routes);

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
    /* Development Error Handler - Prints stack trace */
    app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

module.exports = app;
