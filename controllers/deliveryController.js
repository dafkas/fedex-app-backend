const mongoose = require("mongoose");
const Package = require("../models/Package");
const Deliverer = require("../models/Deliverer");
const Delivery = require("../models/Delivery");

const getDeliveries = async (req, res) => {
    //FIXME: Deep aggregate address and consumer

    const deliveries = await Delivery.find({
        deliverer: mongoose.Types.ObjectId(req.params.delivererId)
    })
        .populate({
            path: "packages",
            populate: {
                path: "address",
                select: "zip number street city"
            }
        })
        .populate({
            path: "packages",
            populate: {
                path: "consumer",
                select: "name email phone size weight"
            }
        });

    return res.status(200).json({ deliveries });
};

module.exports = {
    getDeliveries
};
