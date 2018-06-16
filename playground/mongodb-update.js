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



  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID("5b23b24eab36855e15401286")
  }, {
    $set: {
      gender: 'female'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((results) => {
    console.log(JSON.stringify(results, undefined, 2));
  });


  // client.close();
});
