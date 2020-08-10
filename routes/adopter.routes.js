const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs')

//const for require shelter model
const shelterModel = require("../models/shelter.model");
//const for require adopter model
const adopterModel = require("../models/adopter.model");

//const for require shelter model
const shelterModel = require("../models/shelter.model");
//const for require adopter model
const adopterModel = require("../models/adopter.model");

//const for require dog model
const dogModel = require("../models/dog.model");


//adopter tiene que ir al finder, tambien el shelter va al finder
//

let CITIES = ['Álava', 'Albacete','Alicante','Almería', 'Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres','Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','A Coruña','Cuenca','Gerona','Granada','Guadalajara','Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra','Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona','Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'];

//edit an delete adopter --> route /editadopter

router.get('/adopter', (req, res) => {
  res.render('adopter.hbs', {CITIES})
})

//edit profile

router.post("/adopter", (req, res) => {
  let adopterData = req.session.loggedInUser
  const {name, location} = req.body

  MusicianModel.findByIdAndUpdate( adopterData._id,{name, location})
    .then((result) => {
      MusicianModel.findById(adopterData._id)
        .then((theResult) => {
          theResult = req.session.loggedInUser 
          res.redirect("/adopter")
        })
      
      })

})

//Delete profile

router.post('/adopter/deleteadopter', (req, res) => {
  adopterModel.find

//doing the filter from the adopter, still need do it from the adopter as well
router.get('/adopter/find-dog', (req, res) => {
  res.render('find-dog.hbs', {CITIES:CITIES,Size:SIZE})
});

router.post('/adopter/find-dog', (req, res) => {
  const {cities, size} = req.body;
  dogModel.find({location: cities, size: SIZE})
  .then ((result) =>
    res.render('find-dog.hbs', {CITIES:CITIES,size:SIZE, dogs: result}));
})
 
});


module.exports = router;