const mongoose = require('mongoose');
const Package = require('../models/Package');
const Deliverer = require('../models/Deliverer');
const Delivery = require('../models/Delivery');

const create = async (req, res) => {
    //constumer = 5ac383eb7746fb3c67364b84
    //deliverer = 5ac38977f36d287dbca60345
    // console.log(req.body.packageIds, typeof req.body.packageIds);
    const delivery = new Delivery({
        consumer: mongoose.Types.ObjectId(req.body.consumerId),
        deliverer: mongoose.Types.ObjectId(req.body.delivererId),
        packages: JSON.parse(req.body.packageIds).map(id =>
            mongoose.Types.ObjectId(id)
        )
    });

    await delivery.save();

    return res
        .status(202)
        .json({ message: 'succes', deliveryId: delivery._id });
};

const getDeliveries = async (req, res) => {
    const deliveries = await Delivery.find({
        deliverer: req.params.delivererId
    }).populate('packages', ['barcode']);

    return res.status(200).json({ deliveries });
};

module.exports = {
    create,
    getDeliveries
};
