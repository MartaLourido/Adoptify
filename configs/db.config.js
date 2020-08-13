const mongoose = require('mongoose');
//para trabajar con heroku 
const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost/adoptify';
// para trabajar con local
// const MONGODB_URI = 'mongodb://localhost/adoptify';


mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log(`Successfully connected to the database ${MONGODB_URI}`))
  .catch(error => {
    console.error(`An error ocurred trying to connect to the database ${MONGODB_URI}: `, error);
    process.exit(1);
  });