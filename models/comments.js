const Joi = require('joi');

const commnets = [];

const validateComment = (comment) => {
    const schema = {
        articleId: Joi.string().required(),
        commentBody: Joi.string().required()
    }
    return Joi.validate(comment, schema);
}

module.exports.Comments = commnets;
module.exports.validate = validateComment;