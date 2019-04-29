# graphql-react-tutorial

I started following [Max' great tutorial](https://www.youtube.com/watch?v=7giZGFDGnkc&list=PL55RiY5tL51rG1x02Yyj93iypUuHYXcB_) for building a graphQL API and use it in a react fronted.

Over time however I thought to bring it to a bigger more furnished project and here it is: **Gang Up** - a simplified meet up clone, that allows you to create and join events.

It includes the following technologies & libaries:

### Backend

- node.js
- express
- graphQL
- mongoDB
- [mongoose](https://mongoosejs.com/)
- [jwt](https://github.com/auth0/node-jsonwebtoken)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)

### Frontend

- react
- react-router
- classnames
- SASS

---

Starting from the tutorial I planed/made following changes:

## API

- [x] User: add profile picture
- [x] Events: add location & teaserimage, remove price
- [x] Events: setup Attendees and handle connection to Users
- [x] Unify Dataloaders
- [ ] restrict bookings to one per user
- [ ] add User-createdEvents query
- [ ] add update event mutation
- [ ] add delete event mutation
- [ ] add update user mutation

## Frontend

- [x] rework project structure
  - [x] refactor request code
  - [x] separte global state
  - [x] extend context
  - [x] separate styling
  - [x] make Event-Components reusable
  - [x] keep state in sync without fetching
  - [ ] bonus: convert to Hooks API
- [x] store token locally\*
- [x] handle token expiration
- [x] access user/event images
- [ ] add User menu
- [x] add visior list
- [ ] add option to edit event
- [ ] basic styling
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
  - [ ] User Menu
- [x] catch errors from API
- [x] display error messages
- [ ] add tooltips
- [x] auto-login after signup

\*I am totaly aware that storing the token localy is a serious security issue. But for sake of simplicity I choose to stick to this solution. Aspecialy as I am not handeling any private Data (except the token itself).

## Testing

- [x] install cypress
- [x] create login command
- [x] tests for Auth component (login/signup)
- [ ] test for Events:
  - [ ] creating
  - [ ] booking & canceling
  - [ ] editing & deleting
- [ ] test for user manipualtion
- [ ] check all error-displays

## Design

- [ ] chose color palette
- [ ] finde name
- [ ] create generic Logo
- [ ] build custom spinner
- [x] add icons

## Future additions

- dynamic pages/routes for events
  - with disqus?
  - move login to modal
- add animations (GSAP)
- add user pages
- redesign elements
