const express = require('express');
const {
    Articles,
    validate
} = require('../models/articles');
const {
    Comments
} = require('../models/comments');
const router = express.Router();

router.get('/', (req, res) => {
    res.send(Articles);
});

router.get('/:id', (req, res) => {
    const article = Articles.find(a => a.id === parseInt(req.params.id));
    if (!article) return res.status(404).send('An article with the given id does not exist')

    res.send(article)
});

router.post('/', (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const a = Articles.find(article => article.id === Articles.length + 1);

    const article = {
        id: !a ? Articles.length + 1 : Articles.length + 2,
        title: req.body.title,
        body: req.body.body,
        createdOn: new Date()
    }

    Articles.push(article);
    res.send(Articles);
});

router.put('/:id', (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const article = Articles.find(a => a.id === parseInt(req.params.id));
    if (!article) return res.status(404).send('An article with the given id does not exist');

    article.title = req.body.title;
    article.body = req.body.body;
    article.createdOn = new Date();

    res.send(article);
});

router.delete('/:id', (req, res) => {
    const article = Articles.find(a => a.id === parseInt(req.params.id));
    if (!article) return res.status(404).send('An article with the given id does not exist');

    const index = Articles.indexOf(article);
    Articles.splice(index, 1);
    res.send(Articles);
})

module.exports = router;