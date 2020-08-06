## Description

In Adoptify, we want to promote the adoption throughout Europe of abandoned dogs in Spanish shelters. In order to conquer that goal we have created this initiative that allows shelters to publish ads about their dogs and be contacted by potential adopters.

## User Stories

homepage - As a user I want to be able to access the homepage so that I see what the app is about and login and signup 404 - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 500 - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault sign up - As a user I want to sign up on the webpage so that I can see all the events that I could attend login - As a user I want to be able to log in on the webpage so that I can get back to my account logout - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account user-profile - As a user I want to check my profile information and be able to edit it, and add new games to my renting library. Also, to go back to the home page if I don't want to see the profile anymore. shelter-profile - As a user I want to check my profile information and be able to edit it, and add new games to my renting library. Also, to go back to the home page if I don't want to see the profile anymore. pet-profile - As a user I want to check my profile information and be able to edit it, and add new information to my renting library. Also, to go back to the home page if I don't want to see the profile anymore. pet create - As a shelter I want to create a pet profile so that I can add more pets.

List of other features outside of the MVPs scope

User profile:

see my profile upload my profile picture see other users profile list of events created by the user list events the user is attending Geo Location:

add geolocation to events when creating show event in a map in event detail page show all events in a map in the event list page Homepage

# ... ROUTES:

GET /

renders the homepage renders login.hbs

GET /auth/signup 

redirects to / if user logged in renders signup-shelter.hbs 
             / signs in body: email password name
             /POST /auth/profile-shelter
redirects to / if user logged in renders signup-adopter.hbs 
             / signs in body: email password name
             /POST /auth/profile-adopter         

redirects to / if user logged in body: email password / POST /auth/:id-profile

body: (empty) GET /

renders profile-adopter (the profile preview + edit form) POST /profile-adopter (edit action)
renders profile-adopter (the profile preview + delete form) POST /home (logout+delete action)

renders profile-shelter (the profile preview + edit form) POST /profile-shelter (edit action)
renders profile-shelter (the profile preview + delete form) POST /home (logout+delete action)
redirects to / if user press button add pet in renders profile-shelter.hbs 
             / signs in body: name breed size
             / POST /profile-dog         

body: button find pet in renders profile-shelter 
GET /find-dog
renders find-dog.hbs includes the list of dogs redirects to / if user presses button GET /dog/:id
renders find-dog.hbs redirects to /filtered-find-dog if user presses button POST /filter-dog

body: button find pet in renders profile-adopter 
GET /find-dog
renders find-dog.hbs includes the list of dogs redirects to / if user presses button GET /dog/:id
renders find-dog.hbs redirects to /filtered-find-dog if user presses button POST /filter-dog

body: button go back t in renders profile-dog GET /find-dog
renders find-dog.hbs includes the list of dogs 


# Models

User model

username: String password: String Event model

owner: ObjectId name: String description: String date: Date location: String attendees: [ObjectId] Links

# Trello

Link to your trello board or picture of your physical board https://trello.com/b/RNCl1E64/simple-project-board

# Git

The url to your repository and to your deployed project https://github.com/MartaLourido/Adoptify

Repository Link

Deploy Link

# Slides

The url to your presentation slides

Slides Link
