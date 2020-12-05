require('dotenv').config()

const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json()) //Middleware that enables Express to use JSON passed in the body of requests


const posts = [
	{
		username: 'Hannah',
		title: 'Post 1'
	},
	{
		username: 'Sarah',
		title: 'Post 2'
	},
	{
		username: 'Ben',
		title: 'Post 3'
	}
]

app.get('/posts', (req, res) => {
	console.log('/posts endpoint hit')
	res.json(posts)
})

app.post('/login', (req, res) => {
	// Authenticate User (Separate tutorial)

	// Here we assume that the user has already been authenticated with username and password
	// We're going to authenticate and serialise this user with JWT
	const username = req.body.username;

	const user = { name: username }

	const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

	res.json({ accessToken: accessToken })


})

app.listen(3000)
