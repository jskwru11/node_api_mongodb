const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {ObjectID} = require('mongodb');

//Todo.remove({})
// Todo.remove({}).then((result) => {
//     console.log(result)
// }).catch((e) => done());

// Todo.findOneAndRemove()

Todo.findByIdAndRemove('5b3599b6922d55678429e845').then((todo) => {
    console.log(todo);
}).catch((e) => {
    console.log(e);
});