<<<<<<< HEAD
# Adoptify

Description

Describe your project in one/two lines.

User Stories

homepage - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
404 - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
sign up as an adoptant - As a adoptant I want to sign up on the webpage for be able to see the pet profiles.
sign up as a shelter - As a shelter I want to sign up on the webpage so that I can create a profile and add the pets of my shelter.
login - As a user I want to be able to log in on the webpage so that I can get back to my account
logout - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
adoptant-profile - As a user I want to check my profile information and be able to edit it, see the pets for adopt one. Also, to go back to the home page if I don't want to see the profile anymore.
shelter-profile - As a user I want to check my profile information and be able to edit it, and add more pets. Also, to go back to the home page if I don't want to see the profile anymore.
pet-profile - As a user I want to check the pet profile to decide if i want adopt one pet. Also, to go back to the home page if I don't want to see the profile anymore.
pet-create - As a shelter I want to create a pet profile so that I can add more pets.


List of other features outside of the MVPs scope

Adopter profile:

see my profile
upload my profile picture
see the pets profiles
delete profile
edit profile

Shelter profile:

see my profile
upload my profile picture
add a pet
find pets
delete information
edit information

...
ROUTES:

GET /

renders the homepage
renders login.hbs

GET /auth/signup

redirects to / if user logged in
renders add-signup.hbs
POST /auth/signup

redirects to / if user logged in
body:
email
password
full name
birthday
gender
address
phone
cardInfo
typeOfCard
cardNumber
expDate
CVV
POST /auth/login

redirects to / if user logged in
body:
email
password
POST /auth/logout

body: (empty)
GET /

renders homepage.hbs (the profile preview + search form)
POST /homepage (search action)

body:
game-title
console
GET /game-search-results

renders game-search-results.hbs
includes the list of games
redirects to / if user presses button
GET /rent-form/:id

renders rent-form.hbs
redirects to /game-search-results if user presses button
POST /rent-form/:id

body:
days
price update
GET /success

renders success.hbs
redirects to / if user presses button
GET /profile

renders user-profile.hbs
redirects to / if user presses button
POST /profile (to edit profile)

redirects to /add-signup (we reuse it but for edit purposes)
body:
email
password
full name
birthday
gender
address
phone
cardInfo
typeOfCard
cardNumber
expDate
CVV
POST /profile (to add game)

body:
game title
console
price
max days of rent
GET /profile

renders user-profile.hbs updated
redirects to / if user presses button
GET /notifications

renders notifications.hbs
redirects to / if user presses button
GET /success (for renter)

renders success.hbs
redirects to /notifications if user presses button

Models

Adoptant model

Username: String
Password: String
Name: String
Email: String
Location: enum
About me: String
Pets: Boolean
Photos: String
Do you want to be a volunteer?: Boolean
Other: String


Shelter model

Username: String
Email: String
Password: String
Location: enum
Address: String
About us: String
Contact person: String
Pets: String
Photos: String


Pet model

Shelter: ObjectId<Shelter>
Name: String
Description: String
Date: Date
Weight: Number
Breed: enum
Good with kids: Boolean
Good with other animals: Boolean
Photos: String
Others: String

Trello

Link to your trello board or picture of your physical board
<a href="#my-trello">https://trello.com/b/RNCl1E64/adoptify-friends-for-life</a>

Git

The url to your repository and to your deployed project
<a href="#my-repository">https://github.com/MartaLourido/Adoptify</a>

Repository Link

Deploy Link

<<<<<<< HEAD
Slides

The url to your presentation slides

Slides Link
<<<<<<< HEAD
=======
=======
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

