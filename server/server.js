
require('./config/config.js')

const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');



var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');




var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());


app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  })

});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err);
  })
});

//GET /todos/<id>
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send({})
  }
  Todo.findById(id).then((todo) => {
    if (!todo) {
        return res.status(404).send('There is no todo that matches the id: ');
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send({})
  });
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send({});
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send({});
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send({});
  })
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  //subset of things user passed to us so user can't update all fields
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send({});
  }
//update the completedAt property based on the completed property.
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
//query by id and update
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send({});
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send({});
  })
});

//Post /users

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User({
    email: body.email,
    password: body.password
  });

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.get('/users', (req, res) => {
  User.find().then((user) => {
    res.send({user});
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.listen(port, () => {
  console.log(`App is currently running on port: ${port}`);
});

module.exports = {
  app
};
