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

const GEO_SCHEMA_MODEL = mongoose.model('geo-schema', GeoSchema);
module.exports  = GEO_SCHEMA_MODEL;