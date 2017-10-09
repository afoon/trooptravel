const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const {secret,dbUser, database} = require('./config');

const passport = require('passport');
const strategy = require('./login');
const massive = require('massive');

const connectionString = `postgres://${dbUser}@localhost/${database}`
const request = require('request');

const port = 3000;
const app = express();

///////////////////////////////////
///////// authentication //////////
///////////////////////////////////


app.use( session({
  secret: secret,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize())
app.use(passport.session())
passport.use(strategy);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

///////////////////////////////////
///////// middleware //////////////
///////////////////////////////////
app.use('/', express.static(__dirname + '/public'));
massive(connectionString).then(db => {
  app.set('db', db);
});
app.use(cors());
app.use(bodyParser.json());

//||||||| login/logout ||||||||

     app.get('/auth/',passport.authenticate('auth0'));
     // app.get('/auth/callback',passport.authenticate('auth0', {succesfulRedirect: '/'}, (req,res)=>{
     //     res.status(200).send(req.user);
     // }))
     app.get('/auth/callback',
     passport.authenticate('auth0', { failureRedirect: '/login' }),
     function(req, res) {
       if (!req.user) {
         throw new Error('user null');
       }
       res.redirect("/");
     }
     );
     
     app.get('/login',
     passport.authenticate('auth0', {}), function (req, res,next) {
     res.redirect('/');
     });
     app.get('/',(req,res)=>{
         res.status(200).send(req.user);
     })
     



//////////////////////////////////
///////// controllers ////////////
//////////////////////////////////
const ctrl = require('./server/controls/dataCtrl')

///////////////////////////////////
/////////// endpoints /////////////
///////////////////////////////////


app.get('/api/users', ctrl.getAll);

app.post('/api/users',ctrl.createUser);
app.post('/api/trips',ctrl.createTrip);
app.post('/api/housing',ctrl.createHousing);
app.post('/api/trips/:id',ctrl.addTripGuest);

app.put('/api/housing/:id', ctrl.updateHousing);
app.put('/api/trips/:id', ctrl.updateTrip);

app.delete('/api/trips/:id', ctrl.deleteTrip);
app.delete('/api/housing/:id', ctrl.deleteHousing);
app.delete('/api/trips/:id', ctrl.removeTripUser);


app.listen( port, () => { console.log(`Andre ${port}`); } );