const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');

//const for require shelter model
const shelterModel = require("../models/shelter.model");
//const for require adopter model
const adopterModel = require("../models/adopter.model");

// INDEX GET ROUTE
router.get('/', (req, res) => res.render('index', { title: 'Welcome to Adoptify' }));

module.exports = router;