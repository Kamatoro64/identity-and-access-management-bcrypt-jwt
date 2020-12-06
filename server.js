require('dotenv').config()

const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const app = express()
app.use(express.json()) //Middleware that enables Express to use JSON passed in the body of requests


// Things that should be externalised, in a database or otherwise

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

const users = []

// Routes

// Get posts (authorisation based on username to return specific posts)
app.get('/posts', authenticateToken, (req, res) => {
	res.json(posts.filter(post => post.username === req.user.name))
})

// Get users 
app.get('/users', (req, res) => {
	res.json(users)
})

app.post('/users', async (req, res) => { // Bcrypt is an asynchronous library so asynchronous (callback) function is required
	// The goal here is to save the user in the users array (or database), without a plaintext password!
	try {
		// const salt = await bcrypt.genSalt()
		// const hashedPassword = await bcrypt.hash(req.body.password, salt)
		const hashedPassword = await bcrypt.hash(req.body.password, 10) //Generate salt and hash password in 1 step
		// console.log(salt)
		console.log(hashedPassword)
		const user = { name: req.body.name, password: hashedPassword }
		users.push(user)
		console.log(users)
		res.status(201).send()
	} catch {
		res.status(500)
	}


})

// Login 
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
