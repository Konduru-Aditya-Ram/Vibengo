const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const lfsrideController = require('../controllers/lfsride.controller');
const authMiddleware = require('../middlewares/auth.middleware');


router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn([ 'auto', 'car', 'moto' ]).withMessage('Invalid vehicle type'),
    lfsrideController.createlfsRide
)

router.post('/end',
    authMiddleware.authUser,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    lfsrideController.endlfsRide
)

module.exports = router;