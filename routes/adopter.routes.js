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

let CITIES = ['', 'Álava', 'Albacete','Alicante','Almería', 'Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres','Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','A Coruña','Cuenca','Gerona','Granada','Guadalajara','Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra','Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona','Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'];
let SIZE = ['', 'small', 'medium', 'large']
//edit an delete adopter --> route /editadopter

router.get('/adopter', (req, res) => {
  adopterModel.findById(req.session.loggedInUser._id)
        .then((adopter) => {
          console.log('User is ', adopter)
          req.session.loggedInUser = adopter
          res.render('users/adopter.hbs', {loggedInUser:req.session.loggedInUser, adopter: adopter})
        })
 
})

router.get('/adopter/editadopter', (req, res) => {
  res.render('editadopter.hbs', {loggedInUser:req.session.loggedInUser, adopter: req.session.loggedInUser})
})

//edit profile

router.post("/adopter/editadopter", (req, res) => {
  let adopterData = req.session.loggedInUser

  console.log(req.body)
  adopterModel.findByIdAndUpdate( adopterData._id, {$set: req.body})
    .then(() => {
      res.redirect('/adopter')    
      })

})

// Delete profile

router.get('/adopter/deleteadopter/:id', (req, res) => {
  const {id} = req.params;
  adopterModel.findByIdAndDelete(id)
    .then(() => res.redirect('/signout')) //doing logout when you delete it
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
    res.render ('petprofile.hbs', {loggedInUser:req.session.loggedInUser, dog: dog})
  })

})

//doing the filter from the shelter, still need do it from the adopter as well
router.get('/adopter/find-dogadopter', (req, res) => {
  res.render('find-dogadopter.hbs', {loggedInUser:req.session.loggedInUser, CITIES:CITIES,Size:SIZE})
})

router.post('/adopter/find-dogadopter', (req, res) => {
  const {city, size} = req.body;
  let filter ={}; //creo objeto vacio, si la ciudad y el size estan vacios salen todos los perros
  if(city !=''){  
    filter.city=city;
  }
  if(size !=''){
    filter.size=size;
  }
  dogModel.find(
    filter
    )
  .then ((result) => {
  console.log(result)
    res.render('find-dogadopter.hbs', {loggedInUser:req.session.loggedInUser, CITIES:CITIES,Size:SIZE, dogs: result});
  })
})



/*
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
*/ 



module.exports = router;