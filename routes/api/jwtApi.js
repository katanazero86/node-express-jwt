const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

// jwt encode
router.post('/encode', async (req, res) => {

    const result = await asyncEncode(req);

    if(result.message === 'success') {
        res.send(200);
    } else {
        console.log(result.message);
        res.send(400);
    }

});

// jwt decode
router.get('/decode', (req, res) => {
    const session = req.session;
    console.log(session);

    res.send(200);
});

// jwt 삭제
router.delete('/destroy', (req, res) => {

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

            resolve({message : 'success'});
        } catch(error) {
            reject({message : error});
        }
    });
};

const asyncDecode = (req) => {
    return new Promise((resolve, reject) => {

    });
};


module.exports = router;
