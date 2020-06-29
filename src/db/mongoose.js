const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://frostack:qNsw9YbkYxwsABDg@cluster0-kbmnh.azure.mongodb.net/pp-api?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  }
);
