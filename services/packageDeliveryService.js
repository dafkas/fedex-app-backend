const Delivery = require('../models/Delivery');

const updateDeliveryStatus = async (deliveryId, isAtHome) => {
    await Delivery.findOneAndUpdate({ _id: deliveryId }, { isAtHome }).exec();
    // TODO: send out socket to deliverer client to refresh

    return res.status(202).json({ message: 'succes' });
};

const updateDeliveryNotification = async (deliveryId, note) => {
    await Delivery.findOneAndUpdate({ _id: deliveryId }, { note }).exec();
    // TODO: send out socket to deliverer client to refresh

    return res.status(202).json({ message: 'succes' });
};

module.exports = {
    updateDeliveryStatus,
    updateDeliveryNotification
};
