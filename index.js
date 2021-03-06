const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const massive = require('massive');
const cors = require('cors');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const {domain,secret,dbUser, database,client,clSecret, access} = require('./config');


const connectionString = access;
const request = require('request');

const port = 3000;
const app = express();

///////////////////////////////////
///////// middleware //////////////
///////////////////////////////////
app.use('/', express.static(__dirname + '/public'));
app.use(cors());
app.use(bodyParser.json());

///////////////////////////////////
///////// authentication //////////
///////////////////////////////////
massive(connectionString).then(instance => {
  app.set('db',instance)
}).catch(err => {
  console.log(err);
})

app.use( session({
  secret: secret,
  resave: true,
  saveUninitialized: true
}));

//||||||| login/logout ||||||||
app.use(passport.initialize());
app.use(passport.session());

// using passport to access auth0
// { domain: config.auth0.domain ... etc}
passport.use(new Auth0Strategy({
    domain: domain,
    clientID: client,
    clientSecret: clSecret,
    callbackURL:  '/auth/callback'
   }, (accessToken, refreshToken, extraParams, profile, done) => {
     //Find user in database
     const db = app.get('db');
     // .then means this is a promise
     db.getUserByAuthId([profile._json.sub]).then((user, err) => {
          //console.log('INITIAL: ', profile._json.context.clientMetadata);
          if (profile.provider == 'facebook'){
            profile._json.context.mutual_friends.data.forEach(function(element) {
              db.checkFriend([profile._json.sub,'facebook|'+element.id]).then(response => {
                if (response.length === 0) {
                  db.updateFriends([profile._json.sub,'facebook|'+element.id])}})
            });
          }
       if (!user[0]) { //if there isn't a user, we'll create one!
        //  console.log('CREATING USER');
         db.createUserByAuth([profile._json.sub, profile.displayName,profile.picture,profile._json.given_name,profile._json.family_name]).then((user, err) => {
          //  console.log('USER CREATED', user[0]);
          
           return done(err, user[0]); // GOES TO SERIALIZE USER
         })
       } else { //when we find the user, return it
        //  console.log('FOUND USER', user[0]);
         return done(err, user[0]);
       }
     });
   }
 ));

// put user on session
 passport.serializeUser((user, done) => {
     done(null, user);
 });

// pull user from session for manipulation
 passport.deserializeUser((user, done) => {
    //  console.log(user);
     done(null, user);
 });




//////////////////////////////////
///////// controllers ////////////
//////////////////////////////////
const ctrl = require('./server/controls/dataCtrl')

///////////////////////////////////
/////////// endpoints /////////////
///////////////////////////////////
// auth endpoints

// initial endpoint to fire off login
app.get('/login', passport.authenticate('auth0', {scope: 'openid profile'}))
;

// redirect to home and use the resolve to catch the user
app.get('/auth/callback',
    passport.authenticate('auth0', { successRedirect: '/#/main',failureRedirect: '/login' }), (req, res) => {
        res.status(200).json(req.user);
});

// if not logged in, send error message and catch in resolve
// else send user
app.get('/auth/me', (req, res) => {
    if (!req.user) {res.redirect('/');}
    if (req.user) {res.redirect('/#/main')}
});

// remove user from session
app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

app.get('/',(req,res)=>{
    res.status(200).send(req.user);
})

//////other endpoints//////
app.get('/auth/logged', (req, res) => {
  if (!req.user) {res.redirect('/login');}
  if (req.user) {res.redirect('/#/main')}
});

app.get('/api/users', ctrl.getAll);
app.get('/api/user', ctrl.getCurrUser);
app.get('/api/utrips', ctrl.getUserTrips);
app.get('/api/currtrip/:tripid', ctrl.getCurrTrip);
app.get('/api/housing/:tripid', ctrl.getHousing);
app.get('/api/tripguest/:tripid', ctrl.getTripGuest);
app.get('/api/transport/:tripid', ctrl.getTransportation);
app.get('/api/utransport/:tripid', ctrl.getTransitRiders);
app.get('/api/rules/:tripid', ctrl.getRules);
app.get('/api/activities/:tripid', ctrl.getActivities);
app.get('/api/uactivities/:tripid', ctrl.getActivityUser);

app.post('/api/users',ctrl.createUser);
app.post('/api/trips',ctrl.createTrip);
app.post('/api/housing',ctrl.createHousing);
app.post('/api/trips/:tripid',ctrl.addTripGuest);
app.post('/api/transport/',ctrl.createTransportation);
app.post('/api/activity/',ctrl.createActivity);
app.post('/api/rules/',ctrl.createRule);
app.post('/api/activity/:tripid',ctrl.addActivityGuest);
app.post('/api/transport/:tripid',ctrl.addTransitRider);

app.put('/api/housing/:id', ctrl.updateHousing);
app.put('/api/trips/:id', ctrl.updateTrip);
app.put('/api/upvote/:id',ctrl.upvote);
app.put('/api/downvote/:id',ctrl.downvote);

app.delete('/api/trips/:id', ctrl.deleteTrip);
app.delete('/api/housing/:id', ctrl.deleteHousing);
app.delete('/api/guest/:id', ctrl.removeTripUser);
app.delete('/api/rule/:id', ctrl.removeRule);


app.listen( port, () => { console.log(`Andre ${port}`); } );