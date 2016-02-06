var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Bear = mongoose.model('Bear')

/* example route */
// router.get('/', function (req, res) {
//   res.json({ message: 'Hello World, This is the root of our api'})
// })

// create a bear
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

// get all bears
router.get('/bears', function (req, res, next) {
  Bear.find(function (err, bears) {
    if (err) {
      res.send(err)
    }

    res.json(bears)
  })
})

// get a bear
router.get('/bears/:bear_id', function (req, res, next) {
  Bear.findById(req.params.bear_id, function (err, bear) {
    if (err) {
      res.send(err)
    }

    res.json(bear)
  })
})

// updated a bear
router.put('/bears/:bear_id', function (req, res, next) {
  Bear.findById(req.params.bear_id, function (err, bear) {
    if (err) {
      res.send(err)
    }

    bear.name = req.body.name

    bear.save(function (err) {
      if (err) {
        res.send(err)
      }

      res.json({ message: 'Bear updated!' })
    })
  })
})

// delete a bear
router.delete('/bears/:bear_id', function (req, res, next) {
  var deleteBear = { _id: req.params.bear_id }
  Bear.remove(deleteBear, function (err) {
    if (err) {
      res.send(err)
    }

    res.json({ message: 'Bear deleted!' })
  })
})

module.exports = router
