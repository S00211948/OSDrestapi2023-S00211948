const express = require('express')
const app = express()
require('dotenv').config();
const port = process.env.PORT
//routes
const books = require('./routes/songs')
const artists = require('./routes/artists')
const db = require('./database')

app.use(express.json());
app.use(express.urlencoded({extended: false})); //Parse URL-encoded bodies
app.use('/songs', books);
app.use('/artists', artists);

app.get('/', (req, res) => res.send('Welcome to my music artist database!'))

app.listen(port, () => console.log(`Listening on port ${port}`))