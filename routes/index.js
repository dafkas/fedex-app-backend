const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const packageController = require('../controllers/packageController');
const deliveryController = require('../controllers/deliveryController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/webshop', catchErrors(authController.packageOrderPage));
router.post('/createOrder', catchErrors(authController.createAccount));

router.get('/success', (req, res) => {
    res.send('Email successfully send!');
});

router.post(
    '/package',
    catchErrors(
        packageController.insertPackage,
        deliveryController.createDelivery
    )
);

router.post('/delivery', catchErrors(deliveryController.create));
router.get(
    '/delivery/:delivererId',
    catchErrors(deliveryController.getDeliveries)
);

router.post(
    '/login',
    catchErrors(
        authController.login,

    )
);

router.post(
    '/profile',
    catchErrors(
        authController.getProfile,
    )
);


router.use('*', (req, res) =>
    res.status(404).json({
        error: 'Endpoint does not exist'
    })
);

module.exports = router;