const app = require('./app');
const io = require('socket.io');

const {
    updateDeliveryStatus,
    updateDeliveryNotification
} = require('../services/packageDeliveryService');

app.set('port', process.env.PORT || 7000);
const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`);
});

const ioServer = io(server);

ioServer.on('connection', socket => {
    console.log('client connected');
    socket.on('delivery:change-home-notification', ({ id, isAtHome }) => {
        updateDeliveryStatus(id, isAtHome);
    });
    socket.on('delivery:change-note', ({ id, note }) => {
        updateDeliveryNotification(id, note);
    });
});

module.exports = { app, io };
