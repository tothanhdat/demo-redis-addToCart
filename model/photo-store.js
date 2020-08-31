const redis         = require("redis");
const client        = redis.createClient();
const PHOTO_COLL    = require("../database/photo_store-coll");
module.exports      = class PhotoStore extends PHOTO_COLL {

    //Demo insert STORE PHOTO
    static insert({ name, place, available }) {
        return new Promise(async resolve => {
            try {

                if (!name)
                    return resolve({ error: true, message: 'params_invalid' });

                    let dataInsert = {
                        name,
                        place,
                        available,
                    };
    
                    let infoAfterInsert = new PHOTO_COLL(dataInsert);
                    //console.log(`infoAfterInsert: ${infoAfterInsert}`);
                    
                    let saveDataInsert = await infoAfterInsert.save();
    
                    if (!saveDataInsert) return resolve({ error: true, message: 'cannot_insert_point' });
                    return resolve({ error: false, data: infoAfterInsert });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }

    //Demo list Photo
    static getList({ lng, lat, maxDis}) {
        return new Promise(async resolve => {
            try {

                if (!lng || !lat || !maxDis)
                    return resolve({ error: true, message: 'params_invalid' });

                    let listStorePhoto = await PHOTO_COLL.aggregate([
                        {
                            $geoNear: {
                                near: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
                                maxDistance: parseInt(maxDis),
                                distanceField: "dist.calculated",
                                includeLocs: "dist.location", // Returns distance
                                spherical: true
                            }
                        }
                    ]);

                    //console.log({ listStorePhoto })
    
                    if (!listStorePhoto) return resolve({ error: true, message: 'cannot_insert_point' });
                    return resolve({ error: false, data: listStorePhoto });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }

    //Demo list Photo
    static getListStoreNear({ lng, lat}) {
        return new Promise(async resolve => {
            try {

                if (!lng || !lat)
                    return resolve({ error: true, message: 'params_invalid' });

                    let listStorePhoto = await PHOTO_COLL.aggregate([
                        {
                            $geoNear: {
                                near: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
                                maxDistance: 5000,
                                distanceField: "dist.calculated",
                                includeLocs: "dist.location", // Returns distance
                                spherical: true
                            }
                        }
                    ]);

                    //console.log({ listStorePhoto })
    
                    if (!listStorePhoto) return resolve({ error: true, message: 'cannot_insert_point' });
                    return resolve({ error: false, data: listStorePhoto });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }
    
}