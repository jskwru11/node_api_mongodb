// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');// desctructure

var obj = new ObjectID();
console.log(obj)


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server')
  };
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  // deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((success) => {
  //   console.log(`The items have been deleted: ${success}`);
  // }, (err) => {
  //   console.log(`Unable to delete the documents: ${err}`);
  // });

  // deleteOne

  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((results) => {
  //   console.log(JSON.stringify(results, undefined, 2));
  // });

  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({_id: new ObjectID("5b247704004bb459a5a5aa48")}).then((results) => {
  //     console.log(JSON.stringify(results, undefined, 2));
  //   });

  db.collection('Users').deleteMany({name: 'John'}).then((results) => {
    console.log(JSON.stringify(results, undefined, 2));
  });

  db.collection('Users').findOneAndDelete({_id: new ObjectID("5b2354a767ab0e83af688766")}).then((results) => {
    console.log(JSON.stringify(results, undefined, 2));
  });


  // client.close();
});
