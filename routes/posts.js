const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {

    // Return user
    // res.send(req.user); 
    
    res.json({
        posts: {
            title: 'my first post', 
            description: 'random data you should access'
        }
        });
});

module.exports = router;