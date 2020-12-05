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

app.get('/posts', authenticateToken, (req, res) => {

	res.json(posts.filter(post => post.username === req.user.name))
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

// Create middleware function 
function authenticateToken(req, res, next) {
	// Verify that the user has a valid token and return the user to the get post function

	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1]
	if (token == null) return res.sendStatus(401)

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return res.sendStatus(403) // Token found but invalid

		// Set user object to user found in token
		req.user = user
		next()
	})


}

app.listen(3000)
