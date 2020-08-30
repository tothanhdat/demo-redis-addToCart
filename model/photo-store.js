const redis         = require("redis");
const client        = redis.createClient();
const PHOTO_COLL    = require("../database/photo_store-coll");
module.exports      = class PhotoStore extends PHOTO_COLL {

    //Demo insert hashes redis
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
    
}