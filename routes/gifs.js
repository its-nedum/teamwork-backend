const express = require('express');
const router = express.Router();
const moment = require('moment')
const fileUpload = require('express-fileupload')
const getUserId = require('../middleware/helpers')

//Import our database connection
const client = require('../database/dbcon');

//Setup fileupload
router.use(fileUpload({
    useTempFiles: true
}))

//POST a gif to database
router.post('/gifs', async (req, res) => {
        //Setup cloudinary
        const cloudinary = require('cloudinary').v2
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        })
        const file = req.body.gif;
        if(file.type !== 'image/gif') {
            return res.status(415).json({
                message: 'Please upload a GIF file',  
                })
          }
       cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
        const title = req.body.title;
        const gifId = result.public_id;
        const imageUrl = result.url;
        const user_id = await getUserId(req)
        const createdAt = moment().format('L');
        await client.query('INSERT INTO gifs(title, image_url, user_id, created_at)VALUES($1, $2, $3, current_timestamp)',[title, imageUrl, user_id],(err) => {
            if(err){
                console.log(err)
            }
            res.status(200).json({
                status: 'Success',
                data: {
                    gifId: gifId,
                    message: 'Gif image created successfully!',
                    createdAt: createdAt,
                    title: title,
                    imageUrl: imageUrl,
                    userId: user_id,
                }
            })
            })
        })
        
    })


//POST a comment to a gif using the gif ID
router.post('/gifs/:gifId/comment', async (req, res) => {
    
     const comment = req.body.comment;
     const created_at = moment().format("L");
     const user_id = await getUserId(req)
     const gif_id = req.params.gifId

    await client.query('INSERT INTO gif_comments(comment, gif_id, user_id, created_at)VALUES($1, $2, $3, current_timestamp)', [comment, gif_id, user_id], (err) => {
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
            userId: user_id,
            }
        })
     })
})

//DELETE a gif using the gif ID
router.delete('/gifs/:gifId', (req, res) => {
    //This removes the gif from the gif database 
    client.query("DELETE FROM gifs WHERE id = $1", [req.params.gifId], (err) => {
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
router.get('/gifs/:gifId', async (req, res) => {
    const user_id = await getUserId(req)
    //Query our database and return the required gif using gif ID
   await client.query("SELECT * FROM gifs WHERE id = $1", [req.params.gifId], async (err, gif) => {
        if(err){
            console.log(err)
        }
        
        await client.query("SELECT * FROM gif_COMMENTS WHERE gif_id = $1", [gif.rows[0].id], (error, comments) => {
            if(error){
                console.log(err)
            }  
            res.status(200).json({
                status: 'success',
                    data: {
                        id: gif.rows[0].id,
                        created_at: gif.rows[0].created_at,
                        title: gif.rows[0].title,
                        image_url: gif.rows[0].image_url,
                        comments: comments.rows
                    }
            })
        })
    })
})

// //Get all GIF
router.get('/gifs', (req, res) => {
client.query("SELECT * FROM gifs", (err, result) => {
    if (err) {
            console.log(err)
        }
        res.status(200).json({
            status: 'success',
            data: result.rows
        });
    })
});

module.exports = router;