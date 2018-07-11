var mongoose = require('mongoose');



//connect to mongoose

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOLAB_URI);


module.exports = {
  mongoose
};
