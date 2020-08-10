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
<<<<<<< HEAD
      enum: ['small', 'medium', 'large'],
      required: true   
=======
      required: true,
      enum: ['small', 'medium', 'large']
>>>>>>> a92942474c3d461e4bc5e02dca10b0f82d804c3f
    },
    breed: {
      type: String,
      
    },
    location: { 
      type: String,
      enum: ['Álava', 'Albacete','Alicante','Almería', 'Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres','Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','A Coruña','Cuenca','Gerona','Granada','Guadalajara','Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra','Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona','Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'],
      required: true
    },
<<<<<<< HEAD
=======
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
>>>>>>> a92942474c3d461e4bc5e02dca10b0f82d804c3f
    other: {
      type: String
    },
    
<<<<<<< HEAD

=======
>>>>>>> a92942474c3d461e4bc5e02dca10b0f82d804c3f
  },
  {
    timestamps: true
  }
);

 module.exports = model('dog',dogSchema);