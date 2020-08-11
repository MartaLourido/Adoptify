const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs')

//const for require shelter model
const shelterModel = require("../models/shelter.model");
//const for require adopter model
const adopterModel = require("../models/adopter.model");

//const for require dog model
const dogModel = require("../models/dog.model");

let CITIES = ['Álava', 'Albacete','Alicante','Almería', 'Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres','Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','A Coruña','Cuenca','Gerona','Granada','Guadalajara','Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra','Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona','Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'];

let SIZE = ['small', 'medium', 'large']

//create and edit petprofile
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
  dogModel.findById(req.params.dogId)
    .then(dog => res.render('editdog.hbs', {dog}))
    .catch(e => console.error(e))
})

router.post('/petprofile/:dogId/editdog', (req, res, next) => {
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

router.get('/petprofile/:dogId/deletedog', (req, res, next) => {
  // delete a dog
  dogModel.findByIdAndDelete(
    {_id: req.params.dogId}
  )
  .then(() => res.redirect('/shelter'))
  .catch(() => res.redirect(`/petprofile/${req.params.dogId}/edit`))
});


//doing the filter from the shelter, still need do it from the adopter as well
router.get('/shelter/find-dog', (req, res) => {
  res.render('find-dog.hbs', {CITIES:CITIES,Size:SIZE})
})

router.post('/shelter/find-dog', (req, res) => {
  const {cities, size} = req.body;

  shelterModel.find({location: cities})
    .then((shelters) => {
        let shelterIds = shelters.map((shelter) => shelter._id)
        dogModel.find({shelter: {$in : shelterIds}}) //if dog is from that shelter
        .then((dogs) => {
          res.render('find-dog.hbs', {CITIES:CITIES,size:SIZE, dogs})
        })
    })




 
})

//edit shelter profile


//delete shelter profile

router.post('/shelter/:id/deleteshelter', (req, res, next) => {
  const { id } = req.params;
  shelterModel.findByIdAndDelete(id)
    .then(() => res.redirect('/shelter'))
    .catch((err) => {
      console.log(`Error while deleting a movie: ${err}`);
      next();
    });
});




module.exports = router;
