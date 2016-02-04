var express = require('express')
var app = express()
var mongoose = require('mongoose')
var morgan = require('morgan')
var bodyParser = require('body-parser')

var port = process.env.PORT || 8080

/* Access data from POSTs */
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/* logging */
app.use(morgan('dev'))

/* routing */
var apiRoute = require('./routes/api')
app.use('/api', apiRoute)

/* start server */
app.listen(port)
