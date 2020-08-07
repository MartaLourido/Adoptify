const { Schema, model } = require('mongoose');

let CITIES = []

const adopterSchema = new Schema({
    /*Define schema here */
    username: {
      type: String, 
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true 
    },
    passwordHash: {
      type: String, 
      required: true
    },
    name: {
      type: String
    },
    location: { 
      type: String, 
      enum: CITIES 
    },
    aboutMe: {
      type: String
    },
    volunteer: {
      type: Boolean
    },
    other: {
      type: String
    },

  },
  {
    timestamps: true
  }
);

 module.exports = model('Adopter', adopterSchema);