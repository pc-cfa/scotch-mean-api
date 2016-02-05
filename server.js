var express = require('express')
var mongoose = require('mongoose')
var morgan = require('morgan')
var bodyParser = require('body-parser')

/* models */
require('./app/models/bear')
mongoose.connect('mongodb://localhost:27017/mean-restful-api-example')

/* routes*/
var apiRoute = require('./app/routes/api')

/* init app */
var app = express()

/* logging */
app.use(morgan('dev'))

/* access data from POSTs */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/* register routes */
app.use('/api', apiRoute)

/* start server */
var port = process.env.PORT || 8080
app.listen(port)
