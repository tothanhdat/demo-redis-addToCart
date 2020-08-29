var jwt = require('jsonwebtoken');
const { reject } = require('async');
const { userInfo } = require('os');
// jwt.sign({ foo: 'bar' }, 'shhhhh', (err, token) => {
//     console.log({ token });
// });

// convert promise
/**
 * state:
 *  - pending
 *  - resolve
 *  - reject
 */

// declare function
// JWT_PROMISE_DEMO();
// function JWT_PROMISE_DEMO() {
//     console.log(`-----111-----`)
// }

// var JWT_PROMISE_DEMO2 = function() {
//     console.log(`-----222-----`)
// }
// JWT_PROMISE_DEMO2();


//  // expression Function
const JWT_PROMISE = () => {
    return new Promise((resolve, reject) => {
        jwt.sign({ foo: 'bar' }, 'shhhhh', (err, token) => {
            // if (!err)
            //     return reject({ error: true, message: err.message });
            return resolve({ error: false, data: { token } });
        });
    })
}

// IIFE FUNCTION(
(async function run() {
    try {
        console.log(`----resolve---`);
        let respOfPromise = await JWT_PROMISE();
        console.log({ respOfPromise });
    } catch (error) {
        console.log(`-------errr----`);
        console.log({ error });
    }
})()

async function demo() {
   return 1; 
}

console.log({ __: demo() });
