const Joi = require('@hapi/joi');

const registerValidation = data => {
    const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(data, schema);
};

const loginValidation = data => {
    const schema = {
        email: Joi.string().min(6),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(data, schema);
};

const recipeValidation = data => {
    const schema = {
        id: Joi.string().min(6).max(255).required(),
        title: Joi.string().min(1).max(255).required(),
        category: Joi.string(),
        preparation: Joi.number(),
        servings: Joi.number(),
        ingredients: Joi.array(),
        calories: Joi.number(),
        typeOfPreparation: Joi.string().min(1).max(255),
        directions: Joi.string()
    };
    return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.recipeValidation = recipeValidation;

