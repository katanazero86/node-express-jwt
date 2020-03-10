import jwt from 'jsonwebtoken';

const asyncEncode = (secret, data) => {
    return new Promise((resolve, reject) => {
        try {
            // default HMAC SHA256
            const token = jwt.sign(data, secret);
            resolve({message: 'success', token});
        } catch (error) {
            reject({message: error});
        }
    });
};


// decode
const asyncDecode = (secret, authorization) => {
    return new Promise((resolve, reject) => {
        try {

            jwt.verify(authorization, secret, (err, decoded) => {
                if (decoded != undefined) {
                    resolve({message: 'success', decodeToken: decoded});
                } else {
                    reject({message: 'decode error'});
                }
            });

        } catch (error) {
            reject({message: error})
        }
    });
};

export {asyncEncode, asyncDecode};