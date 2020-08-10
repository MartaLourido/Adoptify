const { Schema, model } = require('mongoose');

let CITIES = ['Álava', 'Albacete','Alicante','Almería', 'Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres','Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','A Coruña','Cuenca','Gerona','Granada','Guadalajara','Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra','Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona','Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'];

const dogSchema = new Schema({
    /*Define schema here */
    shelter: {
      type: Schema.Types.ObjectId,
      ref: "shelter",
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
      required: true,
      enum: ['small', 'medium', 'large']
    },
    breed: {
      type: String,
      
    },
    location: { 
      type: String,
    },
    gender: {
      type: String,
      enum: ['female', 'male']
    },
    goodwkids: {
      type: Boolean,
    },
    goodwdogs: {
      type: Boolean,
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