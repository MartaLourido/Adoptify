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
let SIZE = ['','small', 'medium', 'large']


router.get('/', (req, res) => {
  shelterModel.findById(req.session.loggedInUser._id)
    .then((user) => {
      req.session.loggedInUser = user
      console.log(loggedInUser)
      res.render('users/shelter.hbs', {loggedInUser: req.session.loggedInUser});
    })
  
})

// EDIT SHELTER

router.get('/edit', (req, res) => {
  res.render('editshelter.hbs', {loggedInUser:req.session.loggedInUser, shelter: req.session.loggedInUser})
})

router.post("/edit", (req, res) => {
  let shelterData = req.session.loggedInUser

  console.log(req.body)
  shelterModel.findByIdAndUpdate( shelterData._id, {$set: req.body})
    .then(() => {
      res.redirect('/shelters')    
      })

})


// DELETE SHELTER

router.get('/:id/delete', (req, res, next) => {
  const { id } = req.params;
  shelterModel.findByIdAndDelete(id)
    .then(() => res.redirect('/signout'))
    .catch((err) => {
      console.log(`Error while deleting: ${err}`);
      next();
    });
});

// SHOW YOUR DOGS

router.get('/yourdogs', (req, res) => {
  console.log(req.session.loggedInUser);
  dogModel.find({shelter: req.session.loggedInUser._id})
  .then((dogs) => {
    console.log(dogs)
    let message;
    if (dogs.length === 0) message = "There are no dogs in your shelter!"
    res.render('yourdogs.hbs', {loggedInUser:req.session.loggedInUser, dogs, message})
  })
  .catch((err) => console.log(err))
})

// SHELTER FILTER
router.get('/find-dog', (req, res) => {
  res.render('yourdogs.hbs', {loggedInUser:req.session.loggedInUser, CITIES:CITIES,Size:SIZE})
})

router.post('/find-dog', (req, res) => {
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
    res.render('find-dog.hbs', {loggedInUser:req.session.loggedInUser, CITIES:CITIES,Size:SIZE, dogs: result});
  })
})

// ID DOGPROFILE

router.get('/pet-profile/:dogId', (req, res) => {
  dogModel.findById(req.params.dogId) 
  .then ((dog) => { 
    res.render ('dogprofile.hbs', {loggedInUser:req.session.loggedInUser, dog: dog})
  })

})

module.exports = router;