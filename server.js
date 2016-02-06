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

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.json({
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: {}
  })
})

/* start server */
var port = process.env.PORT || 8080
app.listen(port)
