## Description

In Adoptify, we want to promote the adoption throughout Europe of abandoned dogs in Spanish shelters. In order to conquer that goal we have created this initiative that allows shelters to publish ads about their dogs and be contacted by potential adopters.


## User Stories

 - *Homepage* - As a user I want to be able to access the homepage so that I see what the app is about and login and signup 404 - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault sign up as an adoptant - As a adoptant I want to sign up on the webpage for be able to see the pet profiles. 
- *Sign up as shelter* - As a shelter I want to sign up on the webpage so that I can create a profile and add the pets of my shelter. login - As a user I want to be able to log in on the webpage so that I can get back to my account logout.
- *As a user* - I want to be able to log out from the webpage so that I can make sure no one will access my account adoptant-profile.
- *As a user* - I want to check my profile information and be able to edit it, see the pets for adopt one. Also, to go back to the home page if I don't want to see the profile anymore. 
- *As a user* - I want to check my profile information and be able to edit it, and add more pets. Also, to go back to the home page if I don't want to see the profile anymore. - - *Pet-profile* - As a user I want to check the pet profile to decide if i want adopt one pet. Also, to go back to the home page if I don't want to see the profile anymore. 
- *Pet-create* - As a shelter I want to create a pet profile so that I can add more pets.


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

Renders the homepage renders login.hbs

GET /auth/signup 

Redirects to / if user logged in renders signup-shelter.hbs 
             / signs in body: email password name
             /POST /auth/profile-shelter
Redirects to / if user logged in renders signup-adopter.hbs 
             / signs in body: email password name
             /POST /auth/profile-adopter         

Redirects to / if user logged in body: email password / POST /auth/:id-profile

Body: (empty) GET /

Renders profile-adopter (the profile preview + edit form) POST /profile-adopter (edit action)
Renders profile-adopter (the profile preview + delete form) POST /home (logout+delete action)

Renders profile-shelter (the profile preview + edit form) POST /profile-shelter (edit action)
Renders profile-shelter (the profile preview + delete form) POST /home (logout+delete action)
Redirects to / if user press button add pet in renders profile-shelter.hbs 
             / signs in body: name breed size
             / POST /profile-dog         

Body: button find pet in renders profile-shelter 
GET /find-dog
Renders find-dog.hbs includes the list of dogs redirects to / if user presses button GET /dog/:id
Renders find-dog.hbs redirects to /filtered-find-dog if user presses button POST /filter-dog

Body: button find pet in renders profile-adopter 
GET /find-dog
Renders find-dog.hbs includes the list of dogs redirects to / if user presses button GET /dog/:id
Renders find-dog.hbs redirects to /filtered-find-dog if user presses button POST /filter-dog

Body: button go back t in renders profile-dog GET /find-dog
Renders find-dog.hbs includes the list of dogs 


# Models

 *Adoptant model*
- Username: String 
- Password: String 
- Name: String 
- Email: String 
- Location: enum 
- About me: String 
- Pets: Boolean 
- Photos: String 
- Do you want to be a volunteer?: Boolean 
- Other: String

 *Shelter model*
- Username: String 
- Email: String 
- Password: String 
- Phone: Number
- Location: enum
- Address: String
- About us: String
- Contact person: String
- Pets: String
- Photos: String
- Adopters = [
   dogId: ref
   adopterId: ref
]


 *Pet model*
- Shelter: ObjectId<Shelter>
- Name: String
- Description: String
- Date: Date
- Weight: Number
- Breed: enum
- Good with kids: Boolean
- Good with other animals: Boolean
- Photos: String
- Others: String


# Trello

Link to your trello board or picture of your physical board https://trello.com/b/RNCl1E64/adoptify-friends-for-life


# Git

The url to your repository and to your deployed project https://github.com/MartaLourido/Adoptify

Repository Link

Deploy Link


# Slides

The url to your presentation slides

Slides Link
