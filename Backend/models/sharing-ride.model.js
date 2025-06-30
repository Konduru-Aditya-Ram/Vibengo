const mongoose = require('mongoose');


const sharingrideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    user2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        // required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain',
    },
    pickup: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    pickup2: {
        type: String,
       
    },
    destination2: {
        type: String,
        
    },
    fare: {
        type: Number,
        required: true,
    },
    fare2: {
        type: Number,
        
    },

    status: {
        type: String,
        enum: [ 'pending', 'accepted', "ongoing", 'completed', 'cancelled' ],
        default: 'pending',
    },

    duration: {
        type: Number,
    }, // in seconds

    distance: {
        type: Number,
    }, // in meters

    paymentID: {
        type: String,
    },
    orderId: {
        type: String,
    },
    signature: {
        type: String,
    },

    otp: {
        type: String,
        select: false,
        required: true,
    },
    otp2: {
        type: String,
        select: false,
        
    },
})

module.exports = mongoose.model('sharingride', sharingrideSchema);