const express = require('express');
const router = express.Router();
const moment = require('moment')

//Import our database connection
const client = require('../database/dbcon');


//POST a gif to database
router.post('/gifs', (req, res) => {
    
        const title = req.body.title;
        const imageUrl = req.body.imageUrl;
        const createdAt = moment().format("L");
        const user_id = req.user.user_id

    client.query('INSERT INTO gifs(title, image_url, user_id, created_at)VALUES($1, $2, $3, $4)', [title, imageUrl, user_id, createdAt], (err) => {
            if(err){
                console.log(err)
            }

            res.status(200).json({
                status: 'success',
                data: {
                    message: 'Gif image created successfully!',
                    createdAt: createdAt,
                    title: title,
                    imageUrl: imageUrl
                }
            })
        })
    
})

//POST a comment to a gif using the gif ID
router.post('/gifs/:gifId/comment', (req, res) => {
    
     const comment = req.body.comment;
     const created_at = moment().format("L");
     const user_id = req.user.user_id
     const gif_id = req.params.gifId

     client.query('INSERT INTO gif_comments(comment, gif_id, user_id, created_at)VALUES($1, $2, $3, $4)', [comment, gif_id, user_id, created_at], (err) => {
         if(err){
             console.log(err)
         }

         //Set the response message
    res.status(200).json({
        status: 'success',
        data: {
            message: 'Comment successfully created',
            comment: comment,
            createdAt: created_at,
            }
        })
     })
})

//DELETE a gif using the gif ID
router.delete('/gifs/:gifId', (req, res) => {
    //This removes the gif from the gif database 
    client.query("DELETE FROM gifs WHERE gif_id = $1", [req.params.gifId], (err) => {
        if(err){
            console.log(err)
        }
        //send response
        res.status(200).json({
            status: 'success',
            data: {
                message: 'Gif post successfully deleted',
            }
        })
    })
    
})

//GET a single gif
router.get('/gifs/:gifId', (req, res) => {
    //Query our database and return the required gif using gif ID
    client.query("SELECT * FROM gifs WHERE gif_id = $1", [req.params.gifId], (err, result) => {
        if(err){
            console.log(err)
        }
        res.status(200).json({
            status: 'success',
            data: result.rows
        })
    })
})

//Get all GIF
router.get('/gifs', (req, res) => {
    client.query("SELECT * FROM gifs", (err, result) => {
        if(err){
            console.log(err)
        }
        res.status(200).json({
            status: 'success',
            data: result.rows
        });
    })
    
});

module.exports = router;