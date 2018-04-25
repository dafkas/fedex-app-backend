const app = require('./app');
const io = require('socket.io');

const {
    updateDeliveryAtHomeStatus,
    updateDeliveryNotification,
    createDelivery,
    createPackage,
    updateDeliveriesForDelivery
} = require('../services/packageDeliveryService');

app.set('port', process.env.PORT || 7000);
const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`);
});

const ioServer = io(server);

ioServer.on('connection', socket => {
    console.log('client connected');
    socket.on('package:scanned', async payload => {
        // consumer = 5ac383eb7746fb3c67364b84
        // deliverer = 5ac38977f36d287dbca60345
        try {
            const package = await createPackage(payload);
            await createDelivery({ ...payload, package });
        } catch (e) {
            console.log(e);
        }
    });

    socket.on('package:done-scanning', async ({ delivererId }) => {
        await updateDeliveriesForDelivery(deliveredId);
    });

    socket.on('delivery:change-home-notification', async payload => {
        await updateDeliveryAtHomeStatus(...payload);
    });
    socket.on('delivery:change-note', async payload => {
        await updateDeliveryNotification(...payload);
    });
});

module.exports = { app, io };
