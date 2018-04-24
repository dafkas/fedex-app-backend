const mongoose = require('mongoose');
const Package = require('../models/Package');
const Deliverer = require('../models/Deliverer');
const Delivery = require('../models/Delivery');

const getDeliveries = async (req, res) => {
    //FIXME: Deep aggregate address and consumer
    const deliveries = await Delivery.find({
        deliverer: req.params.delivererId
    }).populate('packages', ['address', 'consumer']);

    return res.status(200).json({ deliveries });
};

module.exports = {
    getDeliveries
};
