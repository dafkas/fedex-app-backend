const app = require('./app');
const httpServer = require('http').createServer(app);
const io = require('socket.io');
// const ioServer = io(httpServer);

const { updatePackageStatus } = require('../services/packageDeliveryService');

app.set('port', process.env.PORT || 7000);
const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`);
});

const ioServer = io(server);

ioServer.on('connection', socket => {
    console.log('client connected');
    socket.on('package:change-home-notification', data => {
        console.log('DATA', data);
        updatePackageStatus(data);
    });
});

module.exports = { app, io };
