const Consumer = require('../models/Consumer');
const mailHandler = require('../handlers/mailHandler');

const packageOrderPage = async (req, res) => {
    await res.render('webshop');
};

const createAccount = async (req, res) => {
    const username = Math.floor(1000000 + Math.random() * 9000000000);
    const userPassword = Math.random().toString(36).substr(2, 9)

    const userData = {
        username: username,
        password: userPassword,
        name: req.body.name,
        email: req.body.email,
        adress: req.body.adress,
        phone: req.body.phone
    }

    await Consumer.create(userData);
    mailHandler.sendMail(userData);
    res.send('Email successfully send!');
}

const login = async (req, res) => {
    await Consumer.findOne({ username: req.body.username, password: req.body.password }, function (err, result) {
        if (err) console.log(err);
        if (!result) {
            return res.json('Username or password incorrect');
        } else {
            return res.json('loggedIn');
        }
    });
};

module.exports = {
    packageOrderPage,
    createAccount,
    login
};