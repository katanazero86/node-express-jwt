import express from 'express';
import jwt from 'jsonwebtoken';
import asyncify from 'express-asyncify';
const router = asyncify(express.Router());

// jwt encode
router.post('/encode', async (req, res, next) => {

    if(!req.body.name) {
        const error = new Error('not param');
        error.status = 500;
        next(error);
    } else {
        const result = await asyncEncode(req);

        if(result.message == 'success') {
            res.json({
                token : result.token
            });
        } else {
            console.log(result.message);
            res.sendStatus(500);
        }
    }

});

// jwt decode
router.get('/decode', async (req, res, next) => {

    if(!req.headers['authorization']) {
        const error = new Error('not authorization');
        error.status = 500;
        next(error);
    } else {
        const result = await asyncDecode(req);

        if(result.message == 'success') {
            res.json({
                decodeToken : result.decodeToken
            });
        } else {
            console.log(result.message);
            res.sendStatus(500);
        }
    }

});

// jwt 삭제
router.delete('/destroy', (req, res, next) => {

    if(!req.headers['authorization']) {
        const error = new Error('not authorization');
        error.status = 500;
        next(error);
    } else {
        const session = req.session;
        const authorization = req.headers['authorization'];
        if(session[authorization]) {
            delete session[authorization];
            res.json({
                message : 'success'
            })
        } else {
            res.sendStatus(200);
        }
    }

});


const asyncEncode = (req) => {
    return new Promise((resolve, reject) => {
        try {
            const secret = req.app.get('jwt-secret');

            // default HMAC SHA256
            // console.log(req.body); {"name" : "zero86"}
            const token = jwt.sign(req.body, secret);
            const session = req.session;

            session[token] = true;
            resolve({message : 'success', token});
        } catch(error) {
            reject({message : error});
        }
    });
};

const asyncDecode = (req) => {
    return new Promise((resolve, reject) => {
        try {
            const secret = req.app.get('jwt-secret');
            const session = req.session;
            const authorization = req.headers['authorization'];

            if(session[authorization]) {
                jwt.verify(authorization, secret, (err, decoded) => {
                    if(decoded != undefined) {
                        resolve({message : 'success', decodeToken : decoded});
                    } else {
                        reject({message : 'decode error'});
                    }
                });

            } else {
                reject({message : 'not auth'});
            }

        } catch (error) {
            reject({message : error})
        }
    });
};


export default router;
