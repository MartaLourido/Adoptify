const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs')

const UserModel = require('../models/User.model')



router.get('/signup', (req, res) => {
    res.render('auth/signup.hbs')
})

router.get('/signin', (req, res) => {
  res.render('auth/signin.hbs')
})

router.post('/signup', (req, res) => {
    const {email, password} = req.body
    console.log(req.body)

    if(!email || !password){
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
                UserModel.create({email, passwordHash: hashPass })
                  .then(() => {
                      res.redirect('/')
                  })
            })
      })
})


router.post('/signin', (req, res) => {
  const { email, password} = req.body
  console.log(req.body)

  if( !email || !password){
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
      if (doesItMatch){
        // loggedInUser = userData
        req.session.loggedInUser = userData
        res.redirect('/profile')
      }
      else {
        res.status(500).render('auth/signin.hbs', {errorMessage: 'Passwords do not match'})
      }
    })
    .catch((err) => {
        console.log('Error ', err)
    })
})


router.get('/profile', (req, res) => {
    res.render('users/profile.hbs', {loggedInUser: req.session.loggedInUser})
})



module.exports = router;