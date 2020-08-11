const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs')

//const for require shelter model
const shelterModel = require("../models/shelter.model");
//const for require adopter model
const adopterModel = require("../models/adopter.model");

//const for require dog model
const dogModel = require("../models/dog.model");


//adopter tiene que ir al finder, tambien el shelter va al finder
//

let CITIES = ['Álava', 'Albacete','Alicante','Almería', 'Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres','Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','A Coruña','Cuenca','Gerona','Granada','Guadalajara','Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra','Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona','Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'];
let SIZE = ['small', 'medium', 'large']
//edit an delete adopter --> route /editadopter

router.get('/adopter', (req, res) => {
  res.render('adopter.hbs', {adopter: req.session.loggedInUser})
})

router.get('/adopter/editadopter', (req, res) => {
  res.render('editadopter.hbs', {adopter: req.session.loggedInUser})
})

//edit profile

router.post("/adopter", (req, res) => {
  let adopterData = req.session.loggedInUser
  const {name, location} = req.body

  dogModel.findByIdAndUpdate( adopterData._id,{name, location})
    .then((result) => {
      dogModel.findById(adopterData._id)
        .then((theResult) => {
          theResult = req.session.loggedInUser 
          res.redirect("/adopter")
        })
      
      })

})

// Delete profile

router.get('/adopter/deleteadopter/:id', (req, res) => {
  const {id} = req.params;
  adopterModel.findByIdAndDelete(id)
    .then(() => res.redirect('/adopter'))
    .catch((err) => {
      console.log(`Error while deleting the profile: ${err}`);
      next();
    });
});

// .deleteOne({ name: "adopter" })
// .then(() => {(
//   console.log("Your  profile has been deleted"));
// })


//obteniendo el pet profile por id
router.get('/petprofile/:dogId', (req, res) => {
  dogModel.findById(req.params.dogId) 
  .then ((dog) => { 
    res.render ('petprofile.hbs', {dog})
  })

})

//doing the filter from the adopter, still need do it from the adopter as well
router.get('/adopter/find-dogadopter', (req, res) => {
  console.log('pasa por aqui');
  res.render('find-dogadopter.hbs', {CITIES:CITIES,Size:SIZE})
});

router.post('/adopter/find-dogadopter', (req, res) => {
  const {cities, size} = req.body;
  dogModel.find({location: cities, size: SIZE})
  .then ((result) =>
    res.render('find-dogadopter.hbs', {CITIES:CITIES,size:SIZE, dogs: result}));
})
 



module.exports = router;