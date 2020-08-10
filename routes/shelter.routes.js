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

router.post('/pet-profile/create', (req, res) => {
  dogModel.create
  
})