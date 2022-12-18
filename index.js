const express = require('express')
const app = express()
require('dotenv').config();
const port = process.env.PORT
//routes
const books = require('./routes/songs')
const albums = require('./routes/albums')
const artists = require('./routes/artists')
const db = require('./database')
//cors
const cors = require('cors')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false})); //Parse URL-encoded bodies
app.use('/songs', books);
app.use('/artists', artists);
app.use('/albums', albums);

app.get('/', (req, res) => res.send('Welcome to my music artist database!'))

app.listen(port, () => console.log(`Listening on port ${port}`))