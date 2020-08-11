const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');

// const UserModel = require('../models/User.model') comento esto por que voy a unir el auth a los dos modelos

//const for require shelter model
const shelterModel = require("../models/shelter.model");
//const for require adopter model
const adopterModel = require("../models/adopter.model");

let CITIES = ['Álava', 'Albacete','Alicante','Almería', 'Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres','Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','A Coruña','Cuenca','Gerona','Granada','Guadalajara','Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra','Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona','Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'];

router.get('/signup', (req, res) => {
    res.render('auth/signup.hbs',{CITIES})
})

router.get('/signin', (req, res) => {
  res.render('auth/signin.hbs')
})

router.post('/signup', (req, res) => {
    const {username, email, password, signupType, city, name} = req.body
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
                switch (signupType) {  //choose(sigin.hbs)
                  case '1': //adopter, definido en el sigin.hbs
                    adopterModel.create({username, email, passwordHash: hashPass, name, city })
                    .then(() => {
                        res.redirect('/') //ruta a la pagina de tu usuario se ha creado correctamente
                    })
                    break;
        
                    case '2': //shelter, definido en el sigin.hbs
                    shelterModel.create({username, email, passwordHash: hashPass, name, city })
                    .then(() => {
                      res.redirect('/')
                    })
                    break;
                
                  default: 
                    res.redirect('/error'); //si no sale ninguno de los dos tengo que definir la pagina a la que ir
                    break;
                }
             
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

  switch (loginType) {  //choose(sigin.hbs)
    case '1': //adopter, definido en el sigin.hbs
    adopterModel.findOne({email: email})
    .then((userData) => {
      if(userData){
      let doesItMatch = bcryptjs.compareSync(password, userData.passwordHash); 
      console.log(doesItMatch);
      if (doesItMatch){  
        // loggedInUser = userData
        req.session.loggedInUser = userData;
        res.render('users/adopter.hbs',{adopter: userData}); //nombre de la ruta
      }
      else {
        res.status(500).render('auth/signin.hbs', {errorMessage: 'Passwords do not match'})
      }
    }else {
      res.status(500).render('auth/signin.hbs', {errorMessage: 'Passwords do not match'})
    }
  })
    .catch((err) => {
        console.log('Error ', err)
    })
    break;


    case '2': //shelter, definido en el sigin.hbs
    shelterModel.findOne({email: email})
    .then((userData) => {
      if(userData){
      let doesItMatch = bcryptjs.compareSync(password, userData.passwordHash); 
      console.log(doesItMatch);
      if (doesItMatch){  
        // loggedInUser = userData
        req.session.loggedInUser = userData;
        res.redirect('/shelter'); //despues de sign up se redirige a login
      }
      else { //si el password no existe 
        res.status(500).render('auth/signin.hbs', {errorMessage: 'Passwords do not match'})
      }
    }else {  //si el usuario no existe error
      res.status(500).render('auth/signin.hbs', {errorMessage: 'Passwords do not match'})
    }
    })
    .catch((err) => {
        console.log('Error ', err)
    })
    break;
  
    default: 
      res.redirect('/error'); //si no sale ninguno de los dos tengo que definir la pagina a la que ir
      break;
  }
}) 


router.get('/adopter', (req, res) => {
    res.render('users/adopter.hbs', {loggedInUser: req.session.loggedInUser});
})

router.get('/shelter', (req, res) => {
  res.render('users/shelter.hbs', {loggedInUser: req.session.loggedInUser});
})


module.exports = router;