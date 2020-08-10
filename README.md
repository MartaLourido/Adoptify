## Description

In Adoptify, we want to promote the adoption throughout Europe of abandoned dogs in Spanish shelters. In order to conquer that goal we have created this initiative that allows shelters to publish ads about their dogs and be contacted by potential adopters.


## User Stories

- *Homepage* - As a user I want to be able to access the homepage and be able to sign up or login.
- *404 page* - As a user I want to see an error page when an error happens.
- *Sign up as an adopter* - As a adopter I want to sign up on the webpage and be able to see profiles about dogs and get in touch with shelters in order to adopt a pet.
- *Sign up as shelter* - As a shelter I want to sign up on the webpage so that I can create a profile and add the dogs who are rescued by my shelter. 
- *As a user* - I want to be able to log out from the webpage so that I can make sure no one will access my account.
- *As a user* - I want to check my profile information and be able to edit or delete it
- *As a shelter* - I want to be able to create, edit or delete profiles for the dogs who I look after in order to get adoptions. Also, I want to have access to all this profiles listed in a page.
- *As a shelter* - I want to be able to see the request from the adopters.
- *As an adopter* - I want to be able to seek for my ideal pet filtering by size, breed or location and check the chosen profiles.


## List of other features outside of the MVPs scope

- Create merchandise page
- Upload images
- Merchandise
- Responsive design
- APIs with breed information
- Partials
- Sign up/in with Google or Facebook
- Add a contact form


## ... ROUTES

GET / 

renders login.hbs
redirect to /profile-adopter if logged in as adopter
redirect to /profile-shelter if logged in as shelter

POST /login

GET /auth/signup 

renders signup.hbs if user press signup button
redirect to /signup
body: {
username
email
password
}


# Models

 *Adopter model*

- Username: String, Required
- PasswordHash: String, Required
- Name: String 
- Email: String, Required
- Location: enum 
- About me: String 
- Pets: Boolean 
- Photos: String 
- Volunteer: Boolean 
- Other: String

 *Shelter model*
- Username: String, Required 
- Email: String, Required 
- PasswordHash: String, Required
- Phone: Number
- Location: enum
- Address: String
- About us: String
- Contact person: String
- Photos: String
- Adopters = [dogId: ref, adopterId: ref]


 *Pet model*
- Shelter: ObjectId<Shelter>
- Name: String, Required
- Description: String
- Size: eNum,Required
- Age: Number
- Weight: Number
- Breed: eNum, Required
- Good with kids: Boolean
- Good with other animals: Boolean
- Photos: String
- Others: String/*


# Trello

Link to your trello board or picture of your physical board https://trello.com/b/RNCl1E64/adoptify-friends-for-life


# Git

The url to your repository and to your deployed project https://github.com/MartaLourido/Adoptify

Repository Link

Deploy Link


# Slides

The url to your presentation slides

Slides Link
