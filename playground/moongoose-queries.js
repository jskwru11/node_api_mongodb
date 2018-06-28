const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {ObjectID} = require('mongodb');

// var id = '6b3464d50fb0b417042f3cd5';

var id = '5b34cd74bdd37666fd07324f';

// if (!ObjectID.isValid(id)) {
//     console.log(`_id is not valid`)
// };

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log(`all of the todos that equal the id: ${todos}`);
// });


// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     if (!todo) {
//         return console.log('There is no todo that found');
//     }
//     console.log(`todo found: ${todo}`);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('There is no todo that matches the id: ');
//     }
//     console.log(`todo found via _id: ${todo}`);
// }).catch((e) => console.log(e));

User.findById(id).then((user) => {
    if (!user) {
        return console.log('Unable to find user');
    }
    console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));