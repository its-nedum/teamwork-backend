const jwt = require('jsonwebtoken');
 
const verifyToken = (req, res, next) => {
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    //Check if the bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        //Get token from array
        const bearerToken = bearer[1];
        //Set the token
        req.token = bearerToken

        jwt.verify(req.token, 'RANDOM_TOKEN_SECRET', (err) => {
            if(err){
                res.sendStatus(403)
            }else{
                next();
            }
        })
    } else {
        res.sendStatus(403);
    }
};

module.exports = verifyToken