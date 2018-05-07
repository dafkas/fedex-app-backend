const mongoose = require('mongoose');
const Delivery = require('../models/Delivery');
const Package = require('../models/Package');
const Address = require('../models/Address');

const updateDeliveryAtHomeStatus = async (deliveryId, isAtHome) => {
    await Delivery.findOneAndUpdate({ _id: deliveryId }, { isAtHome }).exec();
    // TODO: send out socket to deliverer client to refresh

    return res.status(202).json({ message: 'succes' });
};

const updateDeliveryNotification = async (deliveryId, note) => {
    await Delivery.findOneAndUpdate({ _id: deliveryId }, { note }).exec();
    // TODO: send out socket to deliverer client to refresh

    return res.status(202).json({ message: 'succes' });
};

const updateDeliveriesForDelivery = async delivererId => {
    const deliveryBatch = await Delivery.find({
        $and: [
            { deliverer: mongoose.Types.ObjectId(delivererId) },
            { hasPassedBatch: false }
        ]
    }).populate({ path: 'packages', select: 'consumer' });
    const doubleConsumerIds = [];
    const uniqueDeliveries = [];

    for (const delivery of deliveryBatch) {
        const { consumer } = delivery.packages[0];
        const id = String(consumer);

        if (!doubleConsumerIds.includes(id)) {
            doubleConsumerIds.push(id);
            uniqueDeliveries.push(delivery);
        } else {
            await Delivery.findByIdAndRemove(delivery._id);
        }
    }

    for (const delivery of uniqueDeliveries) {
        // add packages of same consumer id to every delivery
        
    }
};

const createDelivery = async ({ delivererId, package }) =>
    await new Delivery({
        deliverer: mongoose.Types.ObjectId(delivererId),
        packages: package._id,
        hasPassedBatch: false
    }).save();

const createPackage = async ({ consumerId, ...address }) => {
    const { zip, number } = address;

    let addressInstance = await Address.findOne({
        $and: [{ zip }, { number }]
    });

    if (!addressInstance) {
        addressInstance = new Address(address);
        await addressInstance.save();
    }

    const package = new Package({
        consumer: mongoose.Types.ObjectId(consumerId),
        address: addressInstance._id
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
