const redis = require("redis");
const client = redis.createClient();
module.exports = class RedisBasic {

    //Demo insert hashes redis
    static insert({ id, key, value }) {
        return new Promise(resolve => {
            try {

                if (!id || !key)
                    return resolve({ error: true, message: 'params_invalid' });

                client.hmset(id, [
                    'name', key,
                    'age', value,
                ], function(err, reply){
                    if(err){
                        return resolve({ error: true, message: err.message });
                    } else {
                        return resolve({ error: false, data: { reply } });
                    }
                })
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }

    //Demo hashes redis
    static infoHash({id}) {
        return new Promise(resolve => {
            try {

                if (!id)
                    return resolve({ error: true, message: 'params_invalid' });

                client.hgetall(id, function(err, reply){
                    if(err){
                        return resolve({ error: true, message: err.message });
                    } else {
                        return resolve({ error: false, data: { reply } });
                    }
                });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }

    //Thêm vào giỏ hàng
    static addToCart({ nameCart, productID }) {
        return new Promise(async resolve => {
            try {

                if (!productID)
                    return resolve({ error: true, message: 'params_invalid' });
                
                await client.sadd(nameCart, productID, function(err, reply){
                    if(err){
                        return resolve({ error: true, message: err.message });
                    } else {
                        return resolve({ error: false, data: { reply } });
                    }
                });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }

    //Xóa khỏi giỏ hàng
    static removeInCart({ nameCart, productID }) {
        return new Promise(async resolve => {
            try {

                if (!productID)
                    return resolve({ error: true, message: 'params_invalid' });
                
                await client.srem(nameCart, productID, function(err, reply){
                    if(err){
                        return resolve({ error: true, message: err.message });
                    } else {
                        return resolve({ error: false, data: { reply } });
                    }
                });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }

    //Xóa tất cả giỏ hàng
    static removeAllCart({ nameCart }) {
        return new Promise(async resolve => {
            try {

                if (!nameCart)
                    return resolve({ error: true, message: 'params_invalid' });
                
                await client.del(nameCart, function(err, reply){
                    if(err){
                        return resolve({ error: true, message: err.message });
                    } else {
                        return resolve({ error: false, data: { reply } });
                    }
                });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }

    //Giỏ hàng
    static myCart({ nameCart }) {
        return new Promise(async resolve => {
            try {

                if (!nameCart)
                    return resolve({ error: true, message: 'params_invalid' });
                
                await client.smembers(nameCart, function(err, reply){
                    if(err){
                        return resolve({ error: true, message: err.message });
                    } else {
                        return resolve({ error: false, data: { reply } });
                    }
                });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }

    
}