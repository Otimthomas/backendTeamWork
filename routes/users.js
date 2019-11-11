const bcrypt = require('bcrypt');
const _ = require('lodash');

const {
    Users,
    generateAuthToken,
    validate
} = require('../models/users');
const express = require('express');

const router = express.Router();

router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = Users.find(user => user.email === req.body.email);
    if (user) return res.status(400).send('User already registered');

    const b = Users.find(user => user.id === Users.length + 1);
    //console.log(b && b.id);

    user = {
        id: !b ? Users.length + 1 : Users.length + 2,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    };

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const token = generateAuthToken(user);

    Users.push(user);
    res.header('x-auth-token', token)
        .header('access-control-expose-headers', 'x-auth-token')
        .send(_.pick(user, ['id', 'firstName', 'lastName', 'email']))
});

module.exports = router;