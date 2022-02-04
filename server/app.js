const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json());
app.use(cors())


const library = require('./routes/libraryRoute')
const book = require('./routes/bookRoute')
const student = require('./routes/studentRoute')

app.use('/api', library)
app.use('/api', book)
app.use('/api', student)

module.exports = app
