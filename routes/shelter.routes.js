const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs')

//const for require shelter model
const shelterModel = require("../models/shelter.model");
//const for require adopter model
const adopterModel = require("../models/adopter.model");

//const for require dog model
const dogModel = require("../models/dog.model");

router.get('/pet-profile/create', (req, res) => {
  res.render('dogcreate.hbs');
})

// router.get('/doglist', (req, res) => {
//   res.render('doglist.hbs');
// })

router.get('/petprofile/:dogId', (req, res) => {
    dogModel.findById(req.params.dogId) 
    .then ((dog) => { 
      res.render ('petprofile.hbs', {dog})
    })
  
})




router.post('/pet-profile/create', (req, res) => {
  const {
    shelter, name, age, size, description, cities, gender, goodwkids, goodwdogs, other
  } = req.body
  console.log(req.body)
  dogModel.create ({shelter, name, age, size, description, cities, gender, goodwkids: goodwkids == 'on', goodwdogs: goodwdogs == 'on', other})
  .then ((dog) =>
    res.redirect(`/petprofile/${dog._id}`)
  )
  .catch((err) => {
    console.log('Error ', err)
  })
})

module.exports = router;