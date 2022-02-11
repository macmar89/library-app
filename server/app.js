const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json());
app.use(cors())


const library = require('./routes/libraryRoute')
const book = require('./routes/bookRoute')
const user = require('./routes/userRoute')

app.use('/api', library)
app.use('/api', book)
app.use('/api', user)

module.exports = app
