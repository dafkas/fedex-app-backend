const Consumer = require("../models/Consumer");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { name, adres, email, phone, username } = req.body;

  const password = bcrypt.hashSync(req.body.password, 10);
  const consumer = new Consumer({
    name,
    adres,
    email,
    phone,
    username,
    password
  });
  await consumer.save();

  return res.status(200).json({
    consumer,
    message: `Succesfully signed up, ${username}!`
  });
};

module.exports = {
  register
};
