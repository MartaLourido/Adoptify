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


//CREATE DOG PROFILE
router.get('/create', (req, res) => {
  res.render('dogcreate.hbs', {CITIES})
})

router.post('/create', (req, res) => {
  const {
    name, age, size, description, city, gender, goodwkids, goodwdogs, other
  } = req.body
  console.log(req.body)
  dogModel.create ({shelter: req.session.loggedInUser._id, name, age, size, description, city, gender, goodwkids: goodwkids == 'on', goodwdogs: goodwdogs == 'on', other})
  .then ((dog) =>
    res.redirect(`/${dog._id}`)
  )
  .catch((err) => {
    console.log('Error ', err)
  })
})

// PERSONAL DOG PROFILE
router.get('/:dogId', (req, res) => {
  dogModel.findById(req.params.dogId) 
  .then ((dog) => { 
    res.render ('dogprofile.hbs', {loggedInUser:req.session.loggedInUser, dog: dog})
  })
})
 
// EDIT 
router.get('/:dogId/edit', (req, res, next) => {
  dogModel.findById(req.params.dogId)
    .then(dog => res.render('editdog.hbs',{loggedInUser:req.session.loggedInUser, dog: dog
    }))
    .catch(e => console.error(e))
})
router.post('/:dogId/edit', (req, res, next) => {
  const {
    shelter, name, age, size, description, cities, gender, goodwkids, goodwdogs, other
  } = req.body
  dogModel.findByIdAndUpdate(
    {_dogId: req.params.dogId},
    {
      shelter, name, age, size, description, cities, gender, goodwkids, goodwdogs, other
    }
  )
  .then(() => res.redirect(`/dogs/${req.params.dogId}`) )
  .catch(() => res.redirect(`/dogs/${req.params.dogId}/edit`))
});

//DELETE DOG
router.delete('/:dogId', (req, res, next) => {
  dogModel.findByIdAndDelete(
    {_id: req.params.dogId}
  )
  .then(() => res.redirect('/shelter'))
  .catch(() => res.redirect(`/dogs/${req.params.dogId}/edit`))
});

// LIST OF DOGS FOR A PARTICULAR SHELTER
router.get('/doglist', (req, res) => {
  dogModel.find({shelter: req.session.loggedInUser._id})
  .then((dogs) => {
  res.render('doglist.hbs', {dogs})
})
})

module.exports = router;