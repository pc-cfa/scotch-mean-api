var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Bear = mongoose.model('Bear')

/* example route */
// router.get('/', function (req, res) {
//   res.json({ message: 'Hello World, This is the root of our api'})
// })

router.post('/bears', function (req, res, next) {
  var bear = new Bear()
  bear.name = req.body.name

  bear.save(function (err) {
    if (err) {
      return next(err)
    }

    return res.json({ message: 'Bear created!' })
  })
})

module.exports = router
