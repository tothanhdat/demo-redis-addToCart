const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const GeoSchema = new Schema({

    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
});

const StorePhotoSchema = new Schema({

    name: {
        type: String,
        require: [true, "Name field is required"],
        trim: true
    },

    description: String,
    
    phone: String,

    status: {
        type: Number,
        default: 0
    },

    place: GeoSchema,

    available: {
        type: Boolean,
        default: false
    },

    vote: {
        type: Number,
    }

});

const PHOTO_STORE = mongoose.model('photo-store', StorePhotoSchema);
module.exports  = PHOTO_STORE;