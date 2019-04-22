# graphql-react-tutorial

I started following Max' great tutorial for building a graphQL API and use it in a react fronted. Tutorial series: !add Link!


Over time however I thought to bring it to a bigger more furnished project and here it is: **convoke** - a simple meetup clone.

It includes the following technologies & libaries:
!ADD LINKS!
### Backend
- node.js
- express
- graphQL
- mongoDB
- mongoose
- jwt
- bcrypt

### Frontend
- react
- react-router
- classnames
- SASS
Starting from the tutorial I made/planed following changes:

## API

- [x] User: add profile picture
- [x] Events: add location & teaserimage, remove price
- [x] Events: setup Attendes and handle connection to Users
- [x] Unify Dataloaders
- [] restrict bookings to one per user
- [] add User-createdEvents query
- [] add update event mutation
- [] add delete event mutation
- [] add update user mutation

## Frontend

- [x] rework project structure
    - [x] refactor request code
    - [x] separte global state
    - [x] extend context
    - [x] separate styling
    - [x] make Event-Components reusable
    - [] bonus: convert to Hooks API
- [x] store token locally*
- [] handle token expiration
- [x] access user/event images
- [] add User menu
- [] add visior list
- [] add option to edit event
- [] basic styling
    - [x] Implement SASS
    - [x] create basic variables/mixins
    - [x] Login form
    - [x] Navbar
    - [] Buttons (different variants)
    - [] Modal
    - [x] Event Cards
    - [] Event Details
    - [] Visitor List
    - [] Event Form
    - [] User Menu
- [x] catch errors from API
- [] display error messages
- [] add tooltips
- [x] auto-login after signup

## Testing
- [x] install cypress
- [x] create login command
- [x] tests for Auth component (login/signup)
- [] test for Events:
    - [] creating
    - [] booking & canceling
    - [] editing & deleting
- [] test for user manipualtion
- [] check all error-displays

## Design
- [] chose color palete
- [] finde name
- [] create generic Logo
- [] build custom loader

## Future additions
- dynamic pages for events
- add disqus?
- move login to modal
- add animations (GSAP)
- add user pages 
