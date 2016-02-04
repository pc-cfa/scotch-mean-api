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
var router = express.Router()

// api routes
router.get('/', function (req, res) {
  res.json({ message: 'Hello World, This is the root of our api'})
})

/* register routes */
app.use('/api', router)

/* start server */
app.listen(port)
