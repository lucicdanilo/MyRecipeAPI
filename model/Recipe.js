const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    title: {
        type: String,
        required: true,
        min: 1, 
        max: 255
    },
    category: {
        type: String,
    },
    preparation: {
        type: Number,
    },
    servings: {
        type: Number,
    },
    ingredients: [{
        type: String,
    }],
    calories: {
        type: Number,
    },
    typeOfPreparation: {
        type: String,
    },
    directions: {
        type: String,
    },
    recipeImage: {
        data: Buffer,
        contentType: String 
    }



});

module.exports = mongoose.model('recipe', recipeSchema);