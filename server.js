const express = require('express')
const app = express()

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
	res.json(posts)
})
app.listen(3000)