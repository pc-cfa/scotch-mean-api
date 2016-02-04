var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')

router.get('/', function (req, res) {
  res.json({ message: 'Hello World, This is the root of our api'})
})

module.exports = router
