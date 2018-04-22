const mongoose = require('mongoose');
const Package = require('../models/Package');
const Delivery = require('../models/Delivery');
const deliveryController = require('./deliveryController');

const insertPackage = async (req, res) => {
    const { barcode } = req.body;

    const package = new Package({
        barcode
    });

    await package.save();

    return res.status(200).json({
        message: `Created new package with barcode : ${barcode}!`
    });
};

const getPackages = async (req, res) => {
    // const packages = Pa;
};

module.exports = {
    insertPackage
};
