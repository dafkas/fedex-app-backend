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
    const deliveries = await Delivery.find({
        deliverer: mongoose.Types.ObjectId(delivererId)
    }).populate({ path: 'package', select: 'consumer' });

    //TODO: HIER VERDER
    // deliveries afgaan, checken consumer id = gelijk, zo ja delivery verwijderen en toevoegen aan huidige
    // delete pakketjes
};

const createDelivery = async ({ delivererId, package }) =>
    await new Delivery({
        deliverer: mongoose.Types.ObjectId(delivererId),
        packages: package._id
    }).save();

const createPackage = async ({ consumerId, ...address }) => {
    const { zip, number } = address;
    const addressInstance = await Address.find({
        $and: [zip, number]
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
