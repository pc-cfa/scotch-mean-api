var mongoose = require('mongoose')

var BearSchema = new mongoose.Schema({
  name: String
})

mongoose.model('Bear', BearSchema)
