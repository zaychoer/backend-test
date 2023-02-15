const mongoose = require('mongoose');

module.exports = function () {
  const db = process.env.DATABASE_URL;

  mongoose.set('strictQuery', false);

  mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on('connected', function () {
    console.log('Mongoose is connected to ' + db);
  });

  mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error ' + err);
  });

  mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
  });
};
