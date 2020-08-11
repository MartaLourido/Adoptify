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


//edit shelter profile

router.get('/shelter/editshelter', (req, res) => {
  res.render('editshelter.hbs', {loggedInUser:req.session.loggedInUser, shelter: req.session.loggedInUser})
})

//edit profile

router.post("/shelter/editshelter", (req, res) => {
  let shelterData = req.session.loggedInUser

  console.log(req.body)
  shelterModel.findByIdAndUpdate( shelterData._id, {$set: req.body})
    .then(() => {
      res.redirect('/shelter')    
      })

})


//delete shelter profile

router.get('/shelter/deleteshelter/:id', (req, res, next) => {
  const { id } = req.params;
  shelterModel.findByIdAndDelete(id)
    .then(() => res.redirect('/signout'))
    .catch((err) => {
      console.log(`Error while deleting: ${err}`);
      next();
    });
});

//doing the filter from the shelter

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

/*
router.post('/shelter/find-dog', (req, res) => {
  const {city, size} = req.body;
  console.log(req.body);
  shelterModel.find({city: city})
    .then((shelters) => {
        let shelterIds = shelters.map((shelter) => shelter._id)
        dogModel.find({shelter: {$in : shelterIds}}) //if dog is from that shelter
        .then((dogs) => {
          res.render('find-dog.hbs', {CITIES:CITIES,size:SIZE, dogs})
        })
    })
 
})
*/

//obteniendo el pet profile por id
router.get('/petprofile/:dogId', (req, res) => {
  dogModel.findById(req.params.dogId) 
  .then ((dog) => { 
    res.render ('petprofile.hbs', {loggedInUser:req.session.loggedInUser, dog: dog})
  })

})

module.exports = router;