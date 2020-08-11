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

//edit get y post
router.get('/petprofile/editdog/:dogId', (req, res, next) => {
  //Update the dog
  // ... your code here
  dogModel.findById(req.params.dogId)
    .then(dog => res.render('editdog.hbs',{loggedInUser:req.session.loggedInUser, dog: dog
    }))
    .catch(e => console.error(e))
})

router.post('/petprofile/editdog/:dogId', (req, res, next) => {
  // Update the dog profile
  const {
    shelter, name, age, size, description, cities, gender, goodwkids, goodwdogs, other
  } = req.body
  dogModel.findByIdAndUpdate(
    {_dogId: req.params.dogId},
    {
      shelter, name, age, size, description, cities, gender, goodwkids, goodwdogs, other
    }
  )
  .then(() => res.redirect(`/petprofile/${req.params.dogId}`) )
  .catch(() => res.redirect(`/petprofile/${req.params.dogId}/edit`))
});

//delete un post sencillo

router.get('/petprofile/deletedog/:dogId', (req, res, next) => {
  // delete a dog
  dogModel.findByIdAndDelete(
    {_id: req.params.dogId}
  )
  .then(() => res.redirect('/shelter'))
  .catch(() => res.redirect(`/petprofile/${req.params.dogId}/edit`))
});


//doing the filter from the shelter, still need do it from the adopter as well
router.get('/shelter/find-dog', (req, res) => {
  res.render('find-dog.hbs', {loggedInUser:req.session.loggedInUser, CITIES:CITIES,Size:SIZE})
})

router.post('/shelter/find-dog', (req, res) => {
  const {city, size} = req.body;
  dogModel.find({city: city, size: size})
  .then ((result) => {
  console.log(result)
    res.render('find-dog.hbs', {loggedInUser:req.session.loggedInUser, CITIES:CITIES,size:SIZE, dogs: result});
  })
})



module.exports = router;