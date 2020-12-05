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

app.post('/posts', (req, res) => {
	res.json(posts)
})

app.get('/login', (req, res) => {
	// Authenticate User (Separate tutorial)

	// Here we assume that the user has already been authenticated with username and password
	// We're going to authenticate and serialise this user with JWT
	const username = req.body.username;

	const user = { name: username }

	jwt.sign()



})
app.listen(3000)