const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment')
const isAdminCheck = require('../middleware/isAdminCheck')
//Import our database connection
const client = require('../database/dbcon');

//POST a new user
router.post('/create-user', isAdminCheck, (req, res) => {
    //NOTE: Perform some checks on the req.body variable before saving
    const firstName = req.body.firstName
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const gender = req.body.gender;
    const job_role = req.body.jobRole;
    const department = req.body.department;
    const address = req.body.address;
    const phone_no = req.body.phoneNo;
    const created_at = moment().format("L");
    const isAdmin = 'false';
    
    
    //Check whether email already exist
    client.query("SELECT * FROM employees WHERE email = $1", [email], (err, result) => {
        if(err){
            console.log(err)
        }
        //If user exist send message
        if(result.rows[0]){
            return res.status(400).json({message: 'The user already exist'})
        } else{
        //If user is new then add user
            //lets hash our password
    bcrypt.hash(password, 8).then(
        (hash) => {
            const hashPassword = hash;
            client.query("INSERT INTO employees(first_name,last_name,email,password,gender,job_role,department,address,phone_no,created_at,is_admin)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)", 
                [firstName,lastName,email,hashPassword,gender,job_role,department,address,phone_no, created_at, isAdmin], (err) => {
                if(err){
                    console.log(err)
                }
                
                jwt.sign({email:email}, 'RANDOM_TOKEN_SECRET', {expiresIn: '24h'}, (err, token) => {
                    //NOTE: Need to send token as part of header or to local storage then redirect user to dashboard
                    res.status(201).json({
                    message: 'success',
                    data: {
                        message: 'User account created successfully',
                        token,
                        email
                        }
                    })
                });
            })
        }
    ).catch(
        (error) => {
            res.status(500).json({
                error: error
            });
        }
    )
        }
    })
    
})

//SIGN IN user
router.post('/signin', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    //check if email and password is empty
    if(!email || !password){
        return res.status(400).json({message: 'Some values are missing'})
    }
    //check email validity
    const checkedEmail = /\S+@\S+\.\S+/.test(email);
    if(!checkedEmail){
        return res.status(400).json({message: 'Please enter a valid email'})
    }
    //If email is correct then run query
    client.query("SELECT * FROM employees WHERE email = $1", [email], (err, result) => {
        if(err){ 
            console.log(err)
        }
        //If no row was found
        if(!result.rows[0]){
            return res.status(400).json({message: 'The credentials you provided is incorrect'})
        }
        //check if the password match the hashed password in database
        let dbpass = result.rows[0].password;
        bcrypt.compare(password, dbpass).then(
            (valid) => {
                if(valid == false){
                    return res.status(400).json({message: 'The credentials you provided is incorrect'}) 
                }

            jwt.sign({email: email}, 'RANDOM_TOKEN_SECRET', {expiresIn: '24h'}, (err, token) => {
                
                res.status(200).json({
                message: 'success',
                data: {
                    token,
                    userId: result.rows[0].user_id
                    }
                })
            });

        }).catch(
                (error) => {
                    res.status(500).json({
                        error: error
                    });
                }
            );
    
        })
})


module.exports = router;