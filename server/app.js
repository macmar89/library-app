const express = require('express')
const app = express()

app.use(express.json());


const library = require('./routes/libraryRoute')
const book = require('./routes/bookRoute')
const student = require('./routes/studentRoute')

app.use('/api', library)
app.use('/api', book)
app.use('/api', student)

module.exports = app
