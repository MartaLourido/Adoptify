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

router.get('/pet-profile/create', (req, res) => {
  res.render('dogcreate.hbs', {CITIES})
})

router.get('/pet-profile/editdog', (req, res) => {
  res.render('editdog.hbs', {CITIES})
})

router.get('/doglist', (req, res) => {
  dogModel.find({shelter: req.session.loggedInUser._id})
  .then((dogs) => {
  res.render('doglist.hbs', {dogs})
})
})

//obteniendo el pet profile por id
router.get('/petprofile/:dogId', (req, res) => {
    dogModel.findById(req.params.dogId) 
    .then ((dog) => { 
      res.render ('petprofile.hbs', {dog})
    })
  
})

// //edit get y post
// router.get('/petprofile/:id/editdog', (req, res, next) => {
//   //Update the dog
//   // ... your code here
//   dog.findById(req.params.id)
//     .then(dog => res.render('petprofile.hbs', {dog})
//     .catch(e => console.error(e))
// })

router.post('/pet-profile/create', (req, res) => {
  const {
    shelter, name, age, size, description, cities, gender, goodwkids, goodwdogs, other
  } = req.body
  console.log(req.body)
  dogModel.create ({shelter: req.session.loggedInUser._id, name, age, size, description, cities, gender, goodwkids: goodwkids == 'on', goodwdogs: goodwdogs == 'on', other})
  .then ((dog) =>
    res.redirect(`/petprofile/${dog._id}`)
  )
  .catch((err) => {
    console.log('Error ', err)
  })
})


//edit get y post
router.get('/petprofile/:dogId/editdog', (req, res, next) => {
  //Update the dog
  // ... your code here
  dog.findById(req.params.dogId)
    .then(dog => res.render('petprofile.hbs', {dog}))
    .catch(e => console.error(e))
})

router.post('/petprofile/:dogId/editdog', (req, res, next) => {
  // Update the dog profile
  dog.findByIdAndUpdate(
    {_dogId: req.params.dogId},
    req.body
  )
  .then(() => res.redirect('/petprofile/:dogId') )
  .catch(() => res.redirect(`/petprofile/${req.params.id}/edit`))
});

//delete un post sencillo

router.post('/petprofile/:dogId/deletedog', (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
  dog.findByIdAndDelete(
    {_dogId: req.params.dogId}
  )
  .then(() => res.redirect('/shelter'))
  .catch(() => res.redirect(`/petprofile/${req.params.dogId}/edit`))
});

module.exports = router;
