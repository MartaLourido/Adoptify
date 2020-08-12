const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');

//const for require shelter model
const shelterModel = require("../models/shelter.model");
//const for require adopter model
const adopterModel = require("../models/adopter.model");

let CITIES = ['Álava', 'Albacete','Alicante','Almería', 'Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres','Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','A Coruña','Cuenca','Gerona','Granada','Guadalajara','Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra','Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona','Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'];


// SIGN UP GET AND POST 

router.get('/signup', (req, res) => {
    res.render('auth/signup.hbs',{CITIES})
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
                  case '1': //adopter, definido en el signin.hbs
                    adopterModel.create({username, email, passwordHash: hashPass, name, city })
                    .then((userData) => {
                      req.session.loggedInUser = userData;
                      res.redirect('/adopters') //ruta a la pagina de tu usuario se ha creado correctamente
                    })
                    break;
        
                  case '2': //shelter, definido en el sigin.hbs
                    shelterModel.create({username, email, passwordHash: hashPass, name, city })
                    .then((userData) => {
                      req.session.loggedInUser = userData;
                      res.redirect('/shelters')
                    })
                    break;
                
                  default: 
                    res.redirect('/error'); //si no sale ninguno de los dos tengo que definir la pagina a la que ir
                    break;
                }
             
            })
      })
})


// SIGN IN GET AND POST 
router.get('/signin', (req, res) => {
  res.render('auth/signin.hbs')
})

router.post('/signin', (req, res) => {
  const { email, password, loginType} = req.body;
  if( !email || !password || !loginType){  
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
  switch (loginType) {  //choose(signin.hbs)
    case '1': //adopter, definido en el signin.hbs
    adopterModel.findOne({email: email})
    .then((userData) => {
      if(userData){
      let doesItMatch = bcryptjs.compareSync(password, userData.passwordHash); 
      console.log(doesItMatch);
      if (doesItMatch){  
        // loggedInUser = userData
        userData.loginType = loginType;
        req.session.loggedInUser = userData;
        res.redirect('/adopters'); //nombre de la ruta
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
    case '2': //shelter, definido en el signin.hbs
    shelterModel.findOne({email: email})
    .then((userData) => {
      if(userData){
      let doesItMatch = bcryptjs.compareSync(password, userData.passwordHash); 
      console.log(doesItMatch);
      if (doesItMatch){  
        // loggedInUser = userData
        userData.loginType = loginType;
        req.session.loggedInUser = userData;
        res.redirect('/shelters'); //nombre de la ruta
        
      }
      else { //password does not exist  
        res.status(500).render('auth/signin.hbs', {errorMessage: 'Passwords do not match'})
      }
    }else {  //si el usuario no existe error
      res.status(500).render('auth/signin.hbs', {errorMessage: 'Users do not match'})
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


//Log out
router.get('/signout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})


module.exports = router;