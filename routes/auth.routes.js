const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs')

// const UserModel = require('../models/User.model') comento esto por que voy a unir el auth a los dos modelos

//const for require shelter model
const shelterModel = require("../models/shelter.model");
//const for require adopter model
const adopterModel = require("../models/adopter.model");

router.get('/signup', (req, res) => {
    res.render('auth/signup.hbs')
})

router.get('/signin', (req, res) => {
  res.render('auth/signin.hbs')
})

router.post('/signup', (req, res) => {
    const {username, email, password} = req.body
    console.log(req.body)

    if(!username || !email || !password){
        res.status(500).render('auth/signup.hbs', {errorMessage: 'Please enter all details'})
        return;
    }

    const emailReg = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
    if (!emailReg.test(email)){
      res.status(500).render('auth/signup.hbs', {errorMessage: 'Please enter valid email'})
      return;
    }

    const passReg = new RegExp(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/)
    if (!passReg.test(password)){
      res.status(500).render('auth/signup.hbs', {errorMessage: 'Password must be 6 characters and must have a nu ber and a string'})
      return;
    }

    bcryptjs.genSalt(10)
      .then((salt) => {
          bcryptjs.hash(password , salt)
            .then((hashPass) => {
                console.log(hashPass)
                // create that user in the db
                UserModel.create({username, email, passwordHash: hashPass })
                  .then(() => {
                      res.redirect('/')
                  })
            })
      })
})


router.post('/signin', (req, res) => {
  const { email, password, loginType} = req.body;
  console.log(req.body);
  console.log(loginType);

  if( !email || !password || !loginType){  
    console.log('paso por aqui'); //Comprobación de si funciona el login
    //si no le pones el tipo de usuario te pide todos los detalles
      res.status(500).render('auth/signin.hbs', {errorMessage: 'Please enter all details'})
      return;
  }

  const emailReg = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
  if (!emailReg.test(email)){
    res.status(500).render('auth/signin.hbs', {errorMessage: 'Please enter valid email'})
    return;
  }

  const passReg = new RegExp(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/)
  if (!passReg.test(password)){
    res.status(500).render('auth/signin.hbs', {errorMessage: 'Password must be 6 characters and must have a number and a string'})
    return;
  }

  UserModel.findOne({email: email})
    .then((userData) => {

      let doesItMatch = bcryptjs.compareSync(password, userData.passwordHash); 
      console.log(doesItMatch);
      if (doesItMatch){
        // loggedInUser = userData
        req.session.loggedInUser = userData;
        switch (loginType) {  //choose
          case '1': //adopter, definido en el sigin.hbs
            res.redirect('/adopter');
            break;


            case '2': //shelter, definido en el sigin.hbs
            res.redirect('/shelter'); //nombre de la ruta
            break;
        
          default: 
            res.redirect('/error'); //si no sale ninguno de los dos tengo que definir la pagina a la que ir
            break;
        }
        
      }
      else {
        res.status(500).render('auth/signin.hbs', {errorMessage: 'Passwords do not match'})
      }
    })
    .catch((err) => {
        console.log('Error ', err)
    })
})


router.get('/adopter', (req, res) => {
    res.render('users/adopter.hbs', {loggedInUser: req.session.loggedInUser})
})

router.get('/shelter', (req, res) => {
  res.render('users/shelter.hbs', {loggedInUser: req.session.loggedInUser})
})


module.exports = router;