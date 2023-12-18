const express = require('express');
// eslint-disable-next-line
const router = express.Router();
const pokeController = require('../controller/poke.controller');
// eslint-disable-next-line
const { celebrate, Joi } = require('celebrate');


router.get(
    '/',
    celebrate({ body: Joi.object().keys({}) }),
    (err, req, res, next) => {
        if (err) {
            console.error(err);
            return res.status(400).send({ status: false, message: 'Faltan datos por enviar', err });
        }
        next();
    },
    pokeController.list
);

router.post(
    '/login',
    celebrate({
        body: Joi.object().keys({
            username: Joi.string().required(),
            password: Joi.string().min(3).required(),
        }),
    }), 
    (err, req, res, next) => {
        if (err) {
            console.error(err);
            return res.status(400).send({ status: false, message: 'Faltan datos por enviar', err });
        }
        next();
    },
    pokeController.login
);
router.post(
    '/register',
    celebrate({
        body: Joi.object().keys({
            username: Joi.string().required(),
            password: Joi.string().min(3).required(),
        }),
    }), 
    (err, req, res, next) => {
        if (err) {
            console.error(err);
            return res.status(400).send({ status: false, message: 'Faltan datos por enviar', err });
        }
        next();
    },
    pokeController.register
);

router.get(
    '/pokedata',
    celebrate({
        body: Joi.object().keys({
            pokeID: Joi.number().integer().positive().required()
        }),
    }),

    (err, req, res, next) => {
        if (err) {
            console.error(err);
            return res.status(400).send({ status: false, message: 'Faltan datos por enviar', err });
        }
        next();
    },
    pokeController.pokeData
);


module.exports = router;