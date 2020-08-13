const { Schema, model } = require('mongoose');

let CITIES = ['', 'Álava', 'Albacete','Alicante','Almería', 'Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres','Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','A Coruña','Cuenca','Gerona','Granada','Guadalajara','Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra','Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona','Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'];

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
    city: { 
      type: String, 
      enum: CITIES,
    },
    aboutMe: {
      type: String
    },
    volunteer: {
      type: String
    },
    other: {
      type: String
    },

  },
  {
    timestamps: true
  }
);

 module.exports = model('adopter', adopterSchema);