const router = require('express').Router();
const User = require('../model/User');
const recipeModel = require('../model/recipe');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verify = require('./verifyToken');
const multer = require('multer');
const fs = require('fs');
var imageType;

const storage = multer.diskStorage({
destination: function(req, file, cb){
    cb(null, './uploads');
},
filename: function(req, file, cb){
    cb(null, file.originalname);
}
});



const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
        cb(null, true);
        if(file.mimetype === 'image/jpeg'){
            imageType = 'image/jpeg';
        } else {
            imageType = 'image/png';
        }
    } 
    else{
        cb(new Error('Extension not supported!'), false);
    }
};

const upload = multer({
    storage: storage, 
    limits: {
    fileSize: 1024 * 1024 * 5
},
fileFilter: fileFilter
});

const { registerValidation, loginValidation, recipeValidation } = require('../validation');

router.post('/register', async (req, res) => {
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);    
    
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email alredy exists');

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send({ user: user._id });
    } catch(err){
        res.status(400).send(err);
    }
});

router.post('/postrecipe', verify , upload.single('recipeImage'), async (req, res) => {

    console.log(req.file);

    const { error } = recipeValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const recipe = new recipeModel({
        id: req.body.id,
        title: req.body.title,
        category: req.body.category,
        preparation: req.body.preparation,
        servings: req.body.servings,
        ingredients: req.body.ingredients,
        calories: req.body.calories,
        typeOfPreparation: req.body.typeOfPreparation,
        directions: req.body.directions
    });


    recipe.recipeImage.data = fs.readFileSync('./uploads/' + req.file.originalname);
    recipe.recipeImage.contentType = imageType;
    try{
        const savedrecipe = await recipe.save();
        res.send({ recipe: recipe._id });
    }catch(err){
        res.status(400).send(err);
    }
});

router.post('/getrecipe', verify, async (req, res) => {
    var query = recipe.find({"id": req.body.id});
    query.exec(function (err, recipes){
        if(err) return res.status(400).send(err.details[0].message);
        res.send({ recipes });
    })
})

router.post('/getid', async (req, res) => {
    var query = User.find({"email": req.body.email});
    try{
        query.exec(function (err, users){
            if(err) return res.status(400).send(err.details[0].message);
            userId = users[0]._id;
            res.send({ userId });
        })
    }catch(err){
        res.status(400).send(err);
    }

})

// Login
router.post('/login', async (req, res) =>{

const { error } = loginValidation(req.body);
if(error) return res.status(400).send(error.details[0].message);
// Chacking email
const user = await User.findOne({ email: req.body.email });
if (!user) return res.status(400).send('Email or pasword is incorrect!');
// Checking password
const validPass = await bcrypt.compare(req.body.password, user.password);
if(!validPass) return res.status(400).send('Invalid password');

const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
const tokenJSON = {"token": token};
res.header('auth-token', token).send(JSON.stringify(tokenJSON));

});

module.exports = router;