const app = require("./app");
const io = require("socket.io");

const {
    updateDeliveryAtHomeStatus,
    updateDeliveryNotification,
    createDelivery,
    createPackage,
    updateDeliveriesForDelivery
} = require("../services/packageDeliveryService");

app.set("port", process.env.PORT || 7000);
const server = app.listen(app.get("port"), () => {
    console.log(`Express running → PORT ${server.address().port}`);
});

const ioServer = io(server);

ioServer.on("connection", socket => {
    console.log("client connected");
    // HINT: A package has been scanned, create a new package in the DB
    socket.on("package:scanned", async payload => {
        // consumer = 5ac383eb7746fb3c67364b84
        // deliverer = 5ac38977f36d287dbca60345

        const package = await createPackage(payload);

        await createDelivery({ ...payload, package });
    });

    // HINT: A batch of packages has been scanned, delete double consumers (add to a single delivery)
    socket.on("package:done-scanning", async ({ delivererId }) => {
        // await updateDeliveriesForDelivery(delivererId);
        socket.emit("delivery:init", {});
    });

    // HINT: Consumer has updated his at home status
    socket.on("delivery:change-home-notification", async payload => {
        await updateDeliveryAtHomeStatus(payload);
        socket.emit("delivery:data-update", {});
    });
    // HINT: Consumer has updated his note
    socket.on("delivery:change-note", async payload => {
        await updateDeliveryNotification(...payload);
        socket.emit("delivery:data-update", {});
    });
});

module.exports = { app, io };
