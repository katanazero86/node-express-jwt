import express from 'express';
import asyncify from 'express-asyncify';

const router = asyncify(express.Router());

import {asyncEncode, asyncDecode} from '../../service/jwtService';

// jwt encode
router.post('/encode', async (req, res, next) => {

    if (!req.body.name) {
        const error = new Error('not param');
        error.status = 500;
        next(error);
    } else {
        const result = await asyncEncode(req.app.get('jwt-secret'), {...req.body});

        if (result.message == 'success') {
            const session = req.session;
            session[result.token] = true;

            res.json({
                token: result.token
            });
        } else {
            console.log(result.message);
            res.sendStatus(500);
        }
    }

});

// jwt decode
router.get('/decode', async (req, res, next) => {

    if (!req.headers['authorization']) {
        const error = new Error('not authorization');
        error.status = 500;
        next(error);
    } else {
        const authorization = req.headers['authorization'];
        const session = req.session;
        if(session[authorization]) {

            const result = await asyncDecode(req.app.get('jwt-secret'), req.headers['authorization']);

            if (result.message == 'success') {
                res.json({
                    decodeToken: result.decodeToken
                });
            } else {
                console.log(result.message);
                res.sendStatus(500);
            }

        } else {
            res.sendStatus(500);
        }
    }

});

// jwt 삭제
router.delete('/destroy', (req, res, next) => {

    if (!req.headers['authorization']) {
        const error = new Error('not authorization');
        error.status = 500;
        next(error);
    } else {
        const session = req.session;
        const authorization = req.headers['authorization'];
        if (session[authorization]) {
            delete session[authorization];
            res.json({
                message: 'success'
            })
        } else {
            res.sendStatus(200);
        }
    }

});

export default router;
