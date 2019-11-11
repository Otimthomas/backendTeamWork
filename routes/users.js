const {
    Users,
    validate
} = require('../models/users');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send(Users);
});

router.get('/:id', (req, res) => {
    const user = Users.find(c => c.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('A user with that id was not found');
    res.send(user);
});

router.post('/', (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const b = Users.find(user => user.id === Users.length + 1);
    //console.log(b && b.id);

    const user = {
        id: !b ? Users.length + 1 : Users.length + 2,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    };

    Users.push(user);
    res.send(user);
});

router.put('/:id', (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = Users.find(c => c.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('A user with id not found');

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.password = req.body.password;

    res.send(user);
});

router.delete('/:id', (req, res) => {
    const user = Users.find(c => c.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('A user with id not found');
    const index = Users.indexOf(user);

    Users.splice(index, 1);
    res.send(Users);
})

module.exports = router;