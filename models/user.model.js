const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    /*Define schema here */
    username: {
      type: String,
      unique: true,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    passwordHash: {
      type: String, 
      required: true
    }
  },
  {
    timestamps: true
  }
);

 module.exports = model('User', userSchema);