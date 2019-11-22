# Teamwork-backend

[![Build Status](https://travis-ci.org/its-nedum/teamwork-backend.svg?branch=develop)](https://travis-ci.org/its-nedum/teamwork-backend)
[![Coverage Status](https://coveralls.io/repos/github/its-nedum/teamwork-backend/badge.svg?branch=develop)](https://coveralls.io/github/its-nedum/teamwork-backend?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/bc3de9104c14b16772c8/maintainability)](https://codeclimate.com/github/its-nedum/teamwork-backend/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/bc3de9104c14b16772c8/test_coverage)](https://codeclimate.com/github/its-nedum/teamwork-backend/test_coverage)

This is the Backend API for teamwork. Teamwork is an internal social network for employees of an organization. The goal of this
application is to facilitate more interaction between colleagues and promote team bonding.

## Features

### Admin

- Sign in 
- Create an employee user account

### Employees

- Sign in
- Create and share gifs with colleagues
- Write and share articles with colleagues
- Edit their articles
- Delete their articles
- Delete their gifs post
- Comment on other colleagues' article post
- Comment on other colleagues' gif post
- View all articles
- View a specific article
- View a specific gif post

## Installation

Clone repo to your local machine:

```git
git clone https://github.com/its-nedum/teamwork-backend.git
```

**Install dependencies and run locally**<br/>
*Note>> Install node if not already installed on local machine*

Then run:

```npm
npm install
```

Now start the server:

```npm
npm start
```

## Testing

To run tests:

```npm
npm test
```

## API

View API on Heroku [here](https://its-nedum-teamwork-api.herokuapp.com/)

### API Routes

<table>
	<tr>
		<th>HTTP VERB</th>
		<th>ENDPOINT</th>
		<th>FUNCTIONALITY</th>
	</tr>
    <tr>
        <td>POST</td>
        <td>/api/v1/auth/create-user</td>
        <td>Create user account</td>
    </tr>
    <tr>
        <td>POST</td>
        <td>/api/v1/auth/signin</td>
        <td>Login a user</td>
    </tr>
    <tr>
        <td>POST</td>
        <td>/api/v1/gifs</td>
        <td>Create a gif</td>
    </tr>
    <tr>
        <td>POST</td>
        <td>/api/v1/articles</td>
        <td>Create an article</td>
    </tr>
    <tr>
        <td>PATCH</td>
        <td>/api/v1/articles/:articleId</td>
        <td>Edit an article</td>
    </tr>
    <tr>
        <td>DELETE</td>
        <td>/api/v1/articles/:articleId</td>
        <td>Employees can delete their articles</td>
    </tr>
    <tr>
        <td>DELETE</td>
        <td>/api/v1/gifs/:gifId</td>
        <td>Employees can delete their gifs</td>
    </tr>
    <tr>
        <td>POST</td>
        <td>/api/v1/articles/:articleId/comment</td>
        <td>Employees can comment on other colleagues article post</td>
    </tr>
    <tr>
        <td>POST</td>
        <td>/api/v1/gifs/:gifId/comment</td>
        <td>Employee can comment on other colleagues gif post</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>/api/v1/feed</td>
        <td>Employee can view all articles or gif</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>/api/v1/articles/:articleId</td>
        <td>Employees can view a specific article</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>/api/v1/gifs/:gifId</td>
        <td>Employees can view a specific gif post</td>
    </tr>
</table>