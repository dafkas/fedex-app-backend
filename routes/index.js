const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const packageController = require('../controllers/packageController');
const deliveryController = require('../controllers/deliveryController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/webshop', catchErrors(authController.packageOrderPage));

router.get('/success', (req, res) => {
    res.send('Email successfully send!');
})

router.post('/createOrder', catchErrors(authController.createAccount));

// router.post('/register', catchErrors(authController.register));

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


router.use('*', (req, res) =>
    res.status(404).json({
        error: 'Endpoint does not exist'
    })
);

module.exports = router;
