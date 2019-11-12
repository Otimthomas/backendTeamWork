const express = require('express');
const {
    Articles
} = require('../models/articles');
const {
    Comments,
    validate
} = require('../models/comments');

const router = express.Router();

router.get('/', (req, res) => {
    res.send(Comments);
});

router.get('/:id', (req, res) => {
    const comment = Comments.find(com => com.id === parseInt(req.params.id));
    if (!comment) return res.status(404).send('A Comment with that id was not found');

    res.send(comment);
});

router.post('/', (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //console.log(Articles);

    const article = Articles.find(art => art.id === parseInt(req.body.articleId));
    if (!article) return res.status(400).send('Invalid Article id.');

    const c = Comments.find(c => c.id === Articles.length + 1);

    let comment = {
        id: !c ? Comments.length + 1 : Comments.length + 2,
        article: {
            title: article.title,
            body: article.body
        },
        commentBody: req.body.commentBody
    };
    Comments.push(comment);
    res.send(comment);
});

router.put('/:id', (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const article = Articles.find(art => art.id === parseInt(req.body.articleId));
    if (!article) return res.status(400).send('Invalid Article id.');

    const comment = Comments.find(com => com.id === parseInt(req.params.id));
    if (!comment) return res.status(404).send('A Comment with that id was not found');

    comment.commentBody = req.body.commentBody;
    res.send(comment)
});

router.delete('/:id', (req, res) => {
    const comment = Comments.find(com => com.id === parseInt(req.params.id));
    if (!comment) return res.status(404).send('A Comment with that id was not found');

    const index = Comments.indexOf(comment);
    Comments.splice(index, 1);
    res.send(Comments);
})

module.exports = router;