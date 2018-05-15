const Consumer = require('../models/Consumer');
const mailHandler = require('../handlers/mailHandler');

exports.packageOrderPage = async (req, res) => {
    await res.render('webshop');
};

exports.createAccount = async (req, res) => {
    const username = Math.floor(1000000 + Math.random() * 9000000000);
    const userpassword = Math.random().toString(36).substr(2, 9)

    const userData = {
        username: username,
        password: userpassword,
        name: req.body.name,
        email: req.body.email,
        adress: req.body.adress,
        phone: req.body.phone
    }

    await Consumer.create(userData);
    mailHandler.sendMail(userData);

    res.redirect('/success');
}   
