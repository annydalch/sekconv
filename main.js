'use strict'

const express = require('express')
const morgan = require('morgan')

const app = express()
const port = process.env.PORT || 8080

app.use(morgan('dev'))
app.set('view engine', 'pug')

require('./routes.js')(app)

app.listen(port)
console.log(`listening on port ${port}`)
