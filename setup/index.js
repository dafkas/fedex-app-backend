const app = require('./app');
const io = require('socket.io');

const { updatePackageStatus } = require('../services/packageDeliveryService');

app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`);
});

io.listen(server);
io.on('connection', socket => {
    console.log('client connected');
    socket.on('package:change-home-notification', data => {
        updatePackageStatus(data);
    });
});

module.exports = { app, io };
