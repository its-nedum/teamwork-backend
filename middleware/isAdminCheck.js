const jwt = require('jsonwebtoken');
const client = require('../database/dbcon')

const isAdminCheck = (req, res, next) => {
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    //Check if the bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        //Get token from array
        const bearerToken = bearer[1];
        //Set the token
        req.token = bearerToken
        
       jwt.verify(req.token, 'RANDOM_TOKEN_SECRET', (err, decode) => {
           if(err){console.log(err)}
           
           client.query("SELECT is_admin from employees WHERE email = $1",[decode.email],(err, result) => {
            if(err){
                console.log(err)
            }
            
            if(!result.rows[0]){
                res.status(400).json({
                    message: 'Invalid user token'
                })
                return;
            }
            if(result.rows[0].is_admin == 'false'){
                res.status(400).json({
                    message: 'Sorry, You Are Not Authorized For This Action'
                })
                return;
            }
           next();
        })
       });
       
    }else {
        res.sendStatus(403);
    }
         
};

module.exports = isAdminCheck