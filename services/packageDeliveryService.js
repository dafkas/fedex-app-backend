const Package = require('../models/Package');
const Deliverer = require('../models/Deliverer');

const updatePackageStatus = async (id, status) => {
    await Package.findOneAndUpdate({ _id: id }, { status }).exec();

    return res.status(202).json({ message: 'succes' });
};

module.exports = {
    updatePackageStatus
};
