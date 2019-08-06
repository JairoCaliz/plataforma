const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb+srv://jcalizhoyos:1069495296caliz@cluster0-ul61k.mongodb.net/projectDB?retryWrites=true&w=majority", {
  useCreateIndex: true,
  useNewUrlParser: true
})
  .then(db => console.log('DB is connected'))
  .catch(err => console.error(err));
