var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
//id:          mongoose.Schema.Types.ObjectId, NYET _id is auto generated and default
  title:       String,
  description: String,
  resourceUrl: String,
  state:       Number,
  author:      String,
  createdAt:   Date,
  updatedAt:   Date
});

mongoose.model('Todo', TodoSchema);

