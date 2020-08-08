const { Schema, model } = require('mongoose');

let CITIES = ['Álava', 'Albacete','Alicante','Almería', 'Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres','Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara','Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra','Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona','Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'];

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