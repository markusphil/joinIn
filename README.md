# JoinIn

## a graphQL/React based event-app

I started following [Max' great tutorial](https://www.youtube.com/watch?v=7giZGFDGnkc&list=PL55RiY5tL51rG1x02Yyj93iypUuHYXcB_) for building a graphQL API and use it in a React fronted.

Over time I thought, it would be nice to bring it to a bigger and more complex project... and here it is: **JoinIn** - a simplified meet up clone, that allows you and your friends to create and join public events.

It includes the following technologies & libraries:

| Backend | Frontend |
| ------- | -------- |


| - node.js

- express
- graphQL
- mongoDB
- [mongoose](https://mongoosejs.com/)
- [DataLoader](https://github.com/graphql/dataloader)
- [jwt](https://github.com/auth0/node-jsonwebtoken)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) | - react
- react-router
- [classnames](https://github.com/JedWatson/classnames#readme)
- [react-textfit](https://github.com/JedWatson/classnames#readme)
- [simplebar](https://github.com/Grsmto/simplebar)

I choose to do the projects styling using **SASS**. Therefore, I took advise from https://sass-guidelin.es/ and some inspiration from this [great example showing how to use SASS in React](https://hugogiraudel.com/2015/06/18/styling-react-components-in-sass/). Additionally, I included [cypress](https://www.cypress.io/) to integrate end-to-end testing in the development.

---

### Project Progress

Starting from the tutorial I planed/made following changes:

### API

- [x] User: add profile picture
- [x] Events: add location & teaserimage, remove price
- [x] Events: setup Attendees and handle connection to Users
- [x] Unify Dataloaders
- [x] restrict bookings to one per user
- [x] add User-createdEvents query
- [ ] add update event mutation
- [ ] add delete event mutation
- [x] add update user mutation

### Frontend

- [x] rework project structure
  - [x] refactor request code
  - [x] separte global state
  - [x] extend context
  - [x] separate styling
  - [x] make Event-Components reusable
  - [x] keep state in sync without fetching
  - [ ] bonus: convert every component to Hooks API
- [x] store token locally\*
- [x] handle token expiration
- [x] access user/event images
- [x] add User menu
- [x] add visior list
- [ ] add edit event form
- [x] basic styling
  - [x] Implement SASS
  - [x] create basic variables/mixins
  - [x] Login form
  - [x] Navbar
  - [x] Buttons (different variants)
  - [x] Modal
  - [x] Event Cards
  - [x] Event Details
  - [x] Visitor List
  - [x] Event Form
  - [x] make it responsive
- [x] catch errors from API
- [x] display error messages
- [ ] add tooltips
- [x] auto-login after signup

\*I am totaly aware that storing the token localy is a serious security issue. But for sake of simplicity I choose to stick to this solution. Aspecialy as I am not handeling any private Data (except the token itself).

### Testing

- [x] install cypress
- [x] create login command
- [x] tests for Auth component (login/signup)
- [ ] test for Events:
  - [ ] creating
  - [ ] booking & canceling
  - [ ] editing & deleting
- [ ] test for user manipualtion
- [ ] check all error-displays

### Design

- [x] chose color palette
- [x] finde name
- [x] create generic Logo
- [x] add icons

## Future additions

- dynamic pages/routes for events
- move login to modal
- add animations (GSAP)
- add welcome page
- add user pages
- design overhaul
