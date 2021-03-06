const { Schema, model } = require('mongoose');

let CITIES = ['Álava', 'Albacete','Alicante','Almería', 'Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres','Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','A Coruña','Cuenca','Gerona','Granada','Guadalajara','Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra','Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona','Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'];

const shelterSchema = new Schema({
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
    city: { 
      type: String, 
      enum: CITIES,
      required: true
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
    image: {
      type: String,
    },
    request: [{
      dogId: {
        type: Schema.Types.ObjectId, 
        ref: 'dog'
      }, 
      adopterId: {
        type: Schema.Types.ObjectId,
        ref: 'adopter'
      }, 
      }]
    
  },
  {
    timestamps: true
  }
);

 module.exports = model('shelter', shelterSchema);