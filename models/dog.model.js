const { Schema, model } = require('mongoose');

const dogSchema = new Schema({
    /*Define schema here */
    shelter: {
      type: shelterSchema.name,
      required: true
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String, 
      required: true
    },
    size: {
      type: String,
      enum: ['small', 'medium', 'large'],
      required: true   
    },
    location: { 
      type: shelterSchema.location
    },
    other: {
      type: String
    },
    

  },
  {
    timestamps: true
  }
);

 module.exports = model('dog',dogSchema);