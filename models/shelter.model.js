const { Schema, model } = require('mongoose');

let CITIES = []

const shelterSchema = new Schema({
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
      type: String,
    },
    location: { 
      type: String, 
      enum: CITIES 
    },
    address: { 
      type: String
    },
    aboutUs: {
      type: String
    },
    contactPerson: {
      type: String,
    },
    request: [{
      dogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dog'
      }, 
      adopterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'adopter'
      }, 
      }] 
    
  },
  {
    timestamps: true
  }
);

 module.exports = model('Shelter', shelterSchema);
