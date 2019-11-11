const Joi = require('joi');
const jwt = require('jsonwebtoken');

const users = [{
        id: 1,
        firstName: 'Thomas',
        lastName: 'Otim',
        email: 'totim1992@gmail.com',
        password: 'rate123'
    },
    {
        id: 2,
        firstName: 'Heelda',
        lastName: 'Ayugi',
        email: 'heelda95@gmail.com',
        password: 'frost123'
    }
];

function generateAuthToken(user) {
    const token = jwt.sign({
        _id: user._id,
        fistName: user.username,
        lastName: user.lastName,
        email: user.email,
    }, "mySecureKey");
    return token;
}

const validateUser = (user) => {
    const schema = {
        firstName: Joi.string().min(5).max(25).required(),
        lastName: Joi.string().min(5).max(25).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(25).required()
    };
    return Joi.validate(user, schema);
}

module.exports.Users = users;
module.exports.generateAuthToken = generateAuthToken;
module.exports.validate = validateUser;