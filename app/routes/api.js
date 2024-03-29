var express  = require('express');
var cors     = require('cors');
var router   = express.Router();
var mongoose = require('mongoose');
var Todo     = mongoose.model('Todo');

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// model helpers
const E_TIMESTAMP_MODE_NONE   = 0;
const E_TIMESTAMP_MODE_CREATE = 1;
const E_TIMESTAMP_MODE_UPDATE = 2;

///////////////////////////////////////////////////////////////////////////////
function checkRequiredParams(body) {
  var missing_params = [];

  if (!body.hasOwnProperty('title'      )) { missing_params.push('title'      ); } 
  if (!body.hasOwnProperty('content'    )) { missing_params.push('content'    ); } 
  if (!body.hasOwnProperty('resourceUrl')) { missing_params.push('resourceUrl'); } 
  if (!body.hasOwnProperty('state'      )) { missing_params.push('state'      ); } 
  if (!body.hasOwnProperty('author'     )) { missing_params.push('author'     ); } 

  return (missing_params.length == 0);
}

///////////////////////////////////////////////////////////////////////////////
function assignAvailableParams(body, model, eTimeStampMode) {

  if (body.hasOwnProperty('title'      )) { model.title       = body.title;       } 
  if (body.hasOwnProperty('content'    )) { model.content     = body.content;     } 
  if (body.hasOwnProperty('resourceUrl')) { model.resourceUrl = body.resourceUrl; } 
  if (body.hasOwnProperty('state'      )) { model.state       = body.state;       } 
  if (body.hasOwnProperty('author'     )) { model.author      = body.author;      } 

  switch (eTimeStampMode) {
    case E_TIMESTAMP_MODE_NONE:
    break;

    case E_TIMESTAMP_MODE_CREATE:
      model.createdAt = Date.now();
      model.updatedAt = model.createdAt;
      break;

    case E_TIMESTAMP_MODE_UPDATE:
      model.updatedAt  = Date.now();
      break;

    default:
      // Why are we here ??? Unknown timestamp mode
      break;
  } //switch (eTimeStampMode)

}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// available host/api/todos routes
router.get('/', function (req, res, next) {
  var message  = { 
    line01: 'API todo Root - available routes are',
    line02: '',
    line03: 'POST   api/todos     - create a new todo',
    line04: 'GET    api/todos     - get all available todos',
    line05: 'GET    api/todos/:id - get a specified todo',
    line06: 'PUT    api/todos/:id - update a specified todo',
    line07: 'PATCH  api/todos/:id - alter a specified todo',
    line08: 'DELETE api/todos/:id - delete a specified todo',
    line09: '',
    line10: 'all params to be supplied in body / x-www-form-urlencoded' 
  };

  res.json({ message: message });
})

///////////////////////////////////////////////////////////////////////////////
// create a todo
router.post('/todos', function (req, res, next) {

  if (!checkRequiredParams(req.body)) {
    return res.status(400).json({ message: 'Missing parameters!' });
  }

  var todo = new Todo();

  assignAvailableParams(req.body, todo, E_TIMESTAMP_MODE_CREATE);

  todo.save(function (err) {
    if (err) { return next(err); }  // Return 402 DB error ??

    res.json({ message: 'Todo created!', todo: todo });
  });
})

///////////////////////////////////////////////////////////////////////////////
// get all todos
router.get('/todos', function (req, res, next) {
  Todo.find(function (err, todos) {
    if (err) { return next(err); } // Return 402 DB error ??

    res.json({ message: 'Todos retrieved!', todos: todos });
  })
})

///////////////////////////////////////////////////////////////////////////////
// get a todo
router.get('/todos/:todo_id', function (req, res, next) {

  if ((!req.params) || (!req.params.todo_id)) {
    return res.status(400).json({ message: 'No todo_id supplied!' });
  }
  
  Todo.findById(req.params.todo_id, function (err, todo) {
    if (err) { return next(err); } // Return 402 DB error ??
    else if (!todo) {
      return res.status(404).json({ message: 'Todo not found!' });
    }

    res.json({ message: 'Todo retrieved!', todo: todo });
  })
})

///////////////////////////////////////////////////////////////////////////////
// updated a todo
router.put('/todos/:todo_id', function (req, res, next) {

  if ((!req.params) || (!req.params.todo_id)) {
    return res.status(400).json({ message: 'No todo_id supplied!' });
  }

  if (!checkRequiredParams(req.body)) {
    return res.status(400).json({ message: 'Missing parameters!' });
  }

  Todo.findById(req.params.todo_id, function (err, todo) {
    if (err) { return next(err); }  // Return 402 DB error ??
    else if (!todo) {
      return res.status(404).json({ message: 'Todo not found!' });
    }

    assignAvailableParams(req.body, todo, E_TIMESTAMP_MODE_UPDATE);

    todo.save(function (err) {
      if (err) { return next(err); } // Return 402 DB error ??

      res.json({ message: 'Todo updated!', todo: todo });
    })
  })
})

///////////////////////////////////////////////////////////////////////////////
// patched a todo
router.patch('/todos/:todo_id', function (req, res, next) {

  if ((!req.params) || (!req.params.todo_id)) {
    return res.status(400).json({ message: 'No todo_id supplied!' });
  }

  Todo.findById(req.params.todo_id, function (err, todo) {
    if (err) { return next(err); }  // Return 402 DB error ??
    else if (!todo) {
      return res.status(404).json({ message: 'Todo not found!' });
    }

    assignAvailableParams(req.body, todo, E_TIMESTAMP_MODE_UPDATE);

    todo.save(function (err) {
      if (err) { return next(err); } // Return 402 DB error ??

      res.json({ message: 'Todo updated!', todo: todo });
    })
  })
})

///////////////////////////////////////////////////////////////////////////////
// delete a todo
router.options('/todos/:todo_id', cors()); // enable pre-flight request for DELETE request

router.delete('/todos/:todo_id', function (req, res, next) {

  if ((!req.params) || (!req.params.todo_id)) {
    return res.status(400).json({ message: 'No todo_id supplied!' });
  }

  var TodoId = { _id: req.params.todo_id };

  Todo.remove(TodoId, function (err, todo) {
    if (err) { return next(err); } // Return 402 DB error ?? 
    else if (!todo) {
      return res.status(404).json({ message: 'Todo not found!' });
    }

    res.json({ message: 'Todo deleted!' });
  })
})

///////////////////////////////////////////////////////////////////////////////
module.exports = router;
///////////////////////////////////////////////////////////////////////////////

