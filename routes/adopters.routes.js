const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs')

//const for require shelter model
const shelterModel = require("../models/shelter.model");
//const for require adopter model
const adopterModel = require("../models/adopter.model");
//const for require dog model
const dogModel = require("../models/dog.model");

let CITIES = ['', 'Álava', 'Albacete','Alicante','Almería', 'Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres','Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','A Coruña','Cuenca','Gerona','Granada','Guadalajara','Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra','Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona','Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'];
let SIZE = ['', 'small', 'medium', 'large']


router.get('/', (req, res) => {
  adopterModel.findById(req.session.loggedInUser._id)
        .then((adopter) => {
          console.log('User is ', adopter)
          req.session.loggedInUser = adopter
          res.render('users/adopter.hbs', {loggedInUser:req.session.loggedInUser, adopter: adopter})
        }) 
})

// EDIT ADOPTER PROFILE 
router.get('/edit', (req, res) => {
  res.render('editadopter.hbs', {loggedInUser:req.session.loggedInUser, adopter: req.session.loggedInUser})
})

router.post("/edit", (req, res) => {
  let adopterData = req.session.loggedInUser
  console.log(req.body)
  adopterModel.findByIdAndUpdate( adopterData._id, {$set: req.body})
    .then(() => {
      res.redirect('/adopters')    
      })
})

// DELETE PROFILE 

router.get('/:id/delete', (req, res) => {
  const {id} = req.params;
  adopterModel.findByIdAndDelete(id)
    .then(() => res.redirect('/signout')) //doing logout when you delete it
    .catch((err) => {
      console.log(`Error while deleting the profile: ${err}`);
      next();
    });
});

// REDIRECT TO FINDER FOR ADOPTER 

router.get('/find-dogadopter', (req, res) => {
  res.render('find-dogadopter.hbs', {loggedInUser:req.session.loggedInUser, CITIES:CITIES,Size:SIZE})
})

router.post('/find-dogadopter', (req, res) => {
  const {city, size} = req.body;
  dogModel.find({city: city, size: size})
  .then ((result) => {
  console.log(result)
    res.render('find-dogadopter.hbs', {loggedInUser:req.session.loggedInUser, CITIES:CITIES,size:SIZE, dogs: result});
  })
})


module.exports = router;