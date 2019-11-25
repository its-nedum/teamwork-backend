const express = require('express');
const router = express.Router();
const moment = require('moment')
const getUserId = require('../middleware/helpers')
//Import our database connection
const client = require('../database/dbcon');


//POST an article to the database
router.post('/articles', async (req, res) => {

     const title = req.body.title;
     const article = req.body.article;
     const created_at = moment().format("L");
     const user_id = await getUserId(req)
    
   await client.query('INSERT INTO articles(title, article, user_id, created_at) VALUES($1, $2, $3, current_timestamp)',
            [title, article, user_id],(err) => {
        if(err){
            console.log(err)
        }
        res.status(201).json({
            status: 'success',
            data: {
                title: title,
                article: article,
                createdAt: created_at,
                userId: user_id,
              }
        })
        
    })
});

//POST a comment on an article
router.post('/articles/:articleId/comment', async (req, res) => {
    //Set the comment object
        const comment = req.body.comment;
        const article_id = req.params.articleId; 
        const user_id = await getUserId(req)
        const created_at = moment().format("L");

    await client.query('INSERT INTO article_comments(comment, article_id, user_id, created_at)VALUES($1, $2, $3, current_timestamp)',
            [comment, article_id, user_id],(err) => {
        if(err){
            console.log(err)
        }

        res.status(201).json({
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

//GET a single article (and all associated comments) by ID
router.get('/articles/:articleId', (req, res) => {
    //Query our database and return the required article using article ID
    client.query("SELECT * FROM articles WHERE article_id = $1", [req.params.articleId], (err, result) => {
        if(err){
            console.log(err)
        }
        res.status(200).json({
         status: 'success',
         data: result.rows
         })  
    })
}) 

//PATCH a single article using article ID
router.patch('/articles/:articleId', (req, res) => {
    //Collect the edited articles details put it in variables
       const articleId = req.params.articleId;
       const title = req.body.title;
       const article = req.body.article;
       const createdAt = moment().format("L");
    
    //Update the database with the details where the articleId match parameter ID
    client.query('UPDATE articles SET title = $1, article = $2, created_at = current_timestamp WHERE article_id = $4',
        [title, article, createdAt, articleId], (err) => {
            if(err) {
                console.log(err)
            }
            
            //send response
            res.status(200).json({
                status: 'success',
                data: {
                    message: 'Article successfully updated',
                    title: title,
                    article: article,
                    createdAt: createdAt
                }
            })
        })
})

//DELETE an article using the article ID
router.delete('/articles/:articleId', (req, res) => {
    //This removes the article from the article database 
    client.query('DELETE FROM articles WHERE article_id = $1', [req.params.articleId], (err) => {
        if(err){
            console.log(err)
        }
        res.status(200).json({
            status: 'success',
            data: {
                message: 'Article deleted successfully!',
            }
        })
    })  
})

//GET all the articles and gif 
router.get('/feed', async (req, res) => {
   let allFeeds;
      
    //Query articles
   await client.query('SELECT * FROM articles', async (err, articles) => {
        if(err){
            console.log(err)
        }
        
        //Query gifs
        await client.query('SELECT * FROM gifs', (error, gifs) => {
           if(err){console.log(error)} 
          
            allFeeds = articles.rows.concat(gifs.rows)
            
            allFeeds.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

           res.status(200).json({
            status: 'success',
            data: allFeeds,
        })
        })    
    })
});

module.exports = router;
