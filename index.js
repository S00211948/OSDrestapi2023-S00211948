const express = require('express')
const app = express()
require('dotenv').config();
const port = process.env.PORT
//routes
const books = require('./routes/songs')
const db = require('./database')

app.use(express.json());
app.use(express.urlencoded({extended: false})); //Parse URL-encoded bodies
app.use('/songs', books);

app.get('/', (req, res) => res.send('Hello World'))

app.listen(port, () => console.log(`Listening on port ${port}`))