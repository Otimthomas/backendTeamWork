const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const {
    Users,
    generateAuthToken
} = require('../models/users');

const router = express.Router();

router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = Users.find(user => user.email === req.body.email);
    if (!user) return res.status(400).send('Invalid user or password.');
    console.log(user);

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid user or password..');

    const token = generateAuthToken(user);
    res.send(token);
});

const validate = (user) => {
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(255).required()
    }
    return Joi.validate(user, schema);
}

module.exports = router;