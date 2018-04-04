const Package = require("../models/Package");
const deliveryController = require("./deliveryController");

const insertPackage = async (req, res) => {
  const { barcode } = req.body;

  const package = new Package({
    barcode
  });
  await package.save();

  deliveryController.createDelivery(package);

  return res.status(200).json({
    message: `Created new package with barcode : ${barcode}! Added this package to delivery`
  });
};

module.exports = {
  insertPackage
};
