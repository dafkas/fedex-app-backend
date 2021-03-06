const mongoose = require("mongoose");
const Delivery = require("../models/Delivery");
const Consumer = require("../models/Consumer");
const Package = require("../models/Package");
const Address = require("../models/Address");

const randomInRange = (min, max) => Math.random() * (max - min + 1) + min;

const updateDeliveryAtHomeStatus = async ({ deliveryId, atHome }) => {
    // console.log();
    await Delivery.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(deliveryId) },
        { isAtHome: atHome }
    ).exec();
    console.log("UPDATED", deliveryId, atHome);
    // TODO: send out socket to deliverer client to refresh

    // return res.status(202).json({ message: 'succes' });
};

const updateDeliveryNotification = async ({ deliveryId, note }) => {
    await Delivery.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(deliveryId) },
        { note }
    ).exec();
    // TODO: send out socket to deliverer client to refresh
    // return res.status(202).json({ message: 'succes' });
};

const updateDeliveriesForDelivery = async delivererId => {
    // HINT: Find all
    const deliveryBatch = Delivery.find({
        $and: [
            { deliverer: mongoose.Types.ObjectId(delivererId) },
            { hasPassedBatch: false }
        ]
    }).populate({ path: "packages", select: "consumer" });
    const doubleConsumerIds = [];
    const uniqueDeliveries = [];

    for (const delivery of deliveryBatch) {
        const { consumer } = delivery.packages[0];
        const id = String(consumer);
        // HINT: Find double consumers, when there is a double consumer..
        if (doubleConsumerIds.includes(id)) {
            // ..delete the double delivery
            await Delivery.findByIdAndRemove(delivery._id);
        } else {
            // ..it is not yet a double consumer, so push to the array
            doubleConsumerIds.push(id);
            uniqueDeliveries.push(delivery);
        }
    }

    for (const delivery of uniqueDeliveries) {
        // TODO: add packages of same consumer id to every delivery
    }
};

const createDelivery = async ({ delivererId, package }) =>
    await new Delivery({
        deliverer: mongoose.Types.ObjectId(delivererId),
        packages: package._id,
        hasPassedBatch: false,

        date: new Date().toString()
    }).save();

const randomFloatInRange = (min, max) => Math.random() * (max - min + 1) + min;

const createPackage = async ({ consumerId, ...address }) => {
    const existingConsumers = await Consumer.find();

    const randomConsumer =
        existingConsumers[
            Math.floor(randomFloatInRange(0, existingConsumers.length))
        ];

    const { zip, number } = address;

    let addressInstance = await Address.findOne({
        $and: [{ zip }, { number }]
    });

    if (!addressInstance) {
        addressInstance = new Address(address);
        await addressInstance.save();
    }

    const package = new Package({
        consumer: mongoose.Types.ObjectId(randomConsumer._id),
        address: addressInstance._id,
        meta: {
            weight: Math.ceil(randomInRange(0.5, 30)),
            size: Math.ceil(randomInRange(10, 100)),
            floor_num: Math.ceil(randomInRange(0, 44)),
            elevator_present: Math.ceil(Math.random() >= 0.5),
            weather_conditions: Math.ceil(randomInRange(0, 4))
        }
    });
    await package.save();

    return package;
};
module.exports = {
    updateDeliveryAtHomeStatus,
    updateDeliveryNotification,
    updateDeliveriesForDelivery,
    createPackage,
    createDelivery
};
