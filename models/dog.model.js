const { Schema, model } = require('mongoose');

let CITIES = ['', 'Álava', 'Albacete','Alicante','Almería', 'Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres','Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','A Coruña','Cuenca','Gerona','Granada','Guadalajara','Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra','Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona','Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'];
let  SIZE = ['', 'small', 'medium', 'large']

const dogSchema = new Schema({
    shelter: {
      type: Schema.Types.ObjectId,
      ref: "shelter",
      required: true
    },
    name: {
      type: String,
      required: true,
    },
    city: { 
      type: String, 
      enum: CITIES,
      required: true
    },
    description: {
      type: String, 
    },
    size: {
      type: String,
      enum: ['small', 'medium', 'large'],
      required: true   
    },
    breed: {
      type: String,
    },
    other: {
      type: String,
    },
    image: {
      type: String
    },
    goodwkids: {
      type: Boolean
    },
    goodwdogs: {
      type: Boolean
    },
    age: {
      type: Number
    },
    image: {
      type: String
    }
    
 
  },
  {
    timestamps: true
  }
);

 module.exports = model('dog',dogSchema);