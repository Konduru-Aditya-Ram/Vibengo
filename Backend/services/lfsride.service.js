const sharingrideModel = require('../models/sharing-ride.model');
const mapService = require('./maps.service');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const sharingrideService = require('./sharingride.service');
const lfsrideModel = require('../models/lfsride.model')


module.exports.createlfsRide = async ({
    user, pickup, destination, vehicleType
}) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const fare = await sharingrideService.getsharingFare(pickup, destination);



    const lfsride = lfsrideModel.create({
        user,
        pickup,
        destination,
        otp: await sharingrideService.getOtp(6),
        fare: fare[ vehicleType ]
    })


    return lfsride;
}


module.exports.endlfsRide = async ({
    lfsrideId
}) => {
    if (!lfsrideId) {
        throw new Error('RideId required');
    }
    const lfsride = await lfsrideModel.findOneAndUpdate({
        _id : lfsrideId
    },{
         status:'completed'
    })

    return lfsride;
}

// create a endlfsride and add this in addanother of sharingridecontroller or sharingrideservise     
// change addanother take lfsride instead of user,pickup,destination  and add this info to already existing 
// sharing ride using lfsride data and delete lfsride(end lfsride) after this.