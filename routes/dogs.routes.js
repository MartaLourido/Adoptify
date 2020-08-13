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
  res.render('dogcreate.hbs', {CITIES, loggedInUser: req.session.loggedInUser})
})

router.post('/create', (req, res) => {
  let {
    name, age, size, description, city, gender, goodwkids, goodwdogs, other, image
  } = req.body
  console.log(goodwdogs, goodwkids)
  goodwdogs === undefined ? goodwdogs = false : null
  goodwkids === undefined ? goodwkids = false : null
  console.log(goodwdogs, goodwkids)
  //console.log(req.body)
  dogModel.create ({shelter: req.session.loggedInUser._id, name, age, size, description, city, gender, goodwkids, goodwdogs, other, image})
  .then ((dog) =>
    res.redirect(`/shelters/${req.session.loggedInUser._id}/dogs/${dog._id}`)
  )
  .catch((err) => {
    console.log('Error ', err)
  })
})

// PERSONAL DOG PROFILE
router.get('/:dogId', (req, res) => {
  dogModel.findById(req.params.dogId) 
  .populate('shelter')
  .then ((dog) => { 
    //console.log('Dog is', dog)
    let userData = req.session.loggedInUser;
    console.log(userData)
    if(userData.aboutUs){
      userData.loginType = '2';
    }
        else{

          userData.loginType = '1';
        }
    res.render ('dogprofile.hbs', {loggedInUser:userData, dog: dog})
  })
})
 
// EDIT 
router.get('/:dogId/edit', (req, res, next) => {
  dogModel.findById(req.params.dogId)
    .then(dog => res.render('editdog.hbs',{loggedInUser:req.session.loggedInUser, dog: dog, CITIES
    }))
    .catch(e => console.error(e))
})
router.post('/:dogId/edit', (req, res, next) => {
  let {
    name, age, size, description, city, gender, goodwkids, goodwdogs, other, image
  } = req.body
  console.log(req.body)
  goodwdogs === undefined ? goodwdogs = false : null
  goodwkids === undefined ? goodwkids = false : null
  dogModel.findByIdAndUpdate(
    {_id: req.params.dogId},
    {
      name, age, size, description, city, gender, goodwkids, goodwdogs, other, image
    }
  )
  .then(() => res.redirect(`/shelters/${req.session.loggedInUser._id}/dogs/${req.params.dogId}`) )
  .catch(() => res.redirect(`/shelters/${req.session.loggedInUser._id}/dogs/${req.params.dogId}/edit`))
});

//DELETE DOG
router.get('/:dogId/delete', (req, res, next) => {
  dogModel.findByIdAndDelete(
    {_id: req.params.dogId}
  )
  .then(() => res.redirect('/shelters'))
  .catch(() => res.redirect(`/shelters/${req.session.loggedInUser._id}/dogs/${req.params.dogId}/edit`))
});

//Adopt me

router.get('/:dogId/adoptme', (req, res, next) => {
  dogModel.findByIdAndDelete(
    {_id: req.params.dogId}
  )
  .then(() => res.render('adoptme.hbs'))
  .catch(() => res.redirect(`/shelters/${req.session.loggedInUser._id}/dogs/${req.params.dogId}/edit`))
});


// LIST OF DOGS FOR A PARTICULAR SHELTER
router.get('/doglist', (req, res) => {
  dogModel.find({shelter: req.session.loggedInUser._id})
  .then((dogs) => {
  res.render('doglist.hbs', {dogs})
})
})


module.exports = router;