const mongoose = require('mongoose')
require('dotenv').config()
const connectionString = process.env.CONNECTIONSTRING//"mongodb+srv://shane:MrWorldwide@musicdb.haifu0d.mongodb.net/test"

mongoose
.connect(connectionString,
{"useNewURLParser":true,
"useUnifiedTopology": true})
.catch (error => {
    console.log(`Dataabase connection refused ${error}`);
    process.exit(2);
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log("DB connected")
});
