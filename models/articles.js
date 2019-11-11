const Joi = require('joi');

const articles = [{
        id: 1,
        title: 'Work on Public Holidays',
        body: "Working on public holidays sucks because that is the time we spend with out families",
        createdOn: "Monday 2nd July"
    },
    {
        id: 2,
        title: 'First Day at work',
        body: "My first day at work was really interesting i met so may new people",
        createdOn: "2019-11-11T09:03:00.042Z"
    }
];

const validateArticles = (article) => {
    const schema = {
        title: Joi.string().min(5).max(255).required(),
        body: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(article, schema);
};

module.exports.validate = validateArticles;
module.exports.Articles = articles