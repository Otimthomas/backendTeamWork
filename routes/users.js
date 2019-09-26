const users = require('../models/users');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send(users);
});

router.get('/:id', (req, res) => {
    const user = users.find(c => c.id === parseInt(req.params.id));
    if(!user) return res.status(404).send('A user with that id was not found');
    res.send(user);
});

router.post('/', (req, res) => {
    const user = {
        id: users.length + 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    };

    users.push(user);
    res.send(user);
});

router.put('/:id', (req, res) => {
    const user = users.find(c => c.id === parseInt(req.params.id));
    if(!user) return res.status(404).send('A user with id not found');

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.password = req.body.password;

    res.send(user);
});

router.delete('/:id', (req, res) => {
    const user = users.find(c => c.id === parseInt(req.params.id));
    if(!user) return res.status(404).send('A user with id not found');
    const index = users.indexOf(user);

    users.splice(index, 1);
    res.send(users);
})

module.exports = router;
