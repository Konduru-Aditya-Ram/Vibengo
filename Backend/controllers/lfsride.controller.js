const lfsrideService = require('../services/lfsride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');
const { sendMessageToSocketId } = require('../socket');
const lfsrideModel = require('../models/lfsride.model');


module.exports.createlfsRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, pickup, destination, vehicleType } = req.body;

    try {
        const lfsride = await lfsrideService.createlfsRide({ user: req.user._id, pickup, destination, vehicleType });
        res.status(201).json(lfsride);

        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
        lfsride.otp = ""


        // const sharingridesInThisRoute = await mapService.getsharingridesInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 2);

      

        // const lfsrideWithUser = await lfsrideModel.findOne({ _id: lfsride._id }).populate('user');

        // sharingridesInThisRoute.map(sharingride => {

        //     sendMessageToSocketId(sharingride.user.socketId, {
        //         event: 'new-passenger-available',
        //         data: lfsrideWithUser
        //     })

        // })

        
        

    } catch (err) {

        console.log(err);
        return res.status(500).json({ message: err.message });
    }

};


module.exports.endlfsRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { lfsrideId } = req.body;

    try {
        const lfsride = await lfsrideService.endlfsRide({lfsrideId});
        //   sendMessageToSocketId(ride.user.socketId, {
        //     event: 'ride-ended',
        //     data: ride
        // })

    } catch (err) {

        console.log(err);
        return res.status(500).json({ message: err.message });
    }

};

