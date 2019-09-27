const express = require('express');
const articles = require('../models/articles');
const router = express.Router();

router.get('/', (req, res) => {
    res.send(articles);
});

router.get('/:id', (req, res) => {
    const article = articles.find(a => a.id === parseInt(req.params.id));
    if(!article) return res.status(404).send('An article with the given id does not exist')

    res.send(article)
});

router.post('/', (req, res) => {
    const article = {
        id: articles.length  + 1,
        title: req.body.title,
        body: req.body.body,
        createdOn: new Date()
    }

    articles.push(article);
    res.send(articles);
});

router.put('/:id', (req, res) => {
    const article = articles.find(a => a.id === parseInt(req.params.id));
    if(!article)  return res.status(404).send('An article with the given id does not exist');

    article.title = req.body.title;
    article.body = req.body.body;
    article.createdOn = new Date();

    res.send(article);
});

router.delete('/:id', (req, res) => {
    const article = articles.find(a => a.id === parseInt(req.params.id));
    if(!article) return res.status(404).send('An article with the given id does not exist');

    const index = articles.indexOf(article);
    articles.splice(index, 1);
    res.send(articles);
})

module.exports = router;