const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Parties = require('./party.model');
const Users = require('./user.model');
const Sessions = require('./session.model');

const bodyParser = require('body-parser');

mongoose.connect('mongodb+srv://admin:admin@cluster0.m5cjunj.mongodb.net/voting_db?retryWrites=true&w=majority').then(res => {
  console.log('connected to mongo');
})
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(bodyParser.urlencoded());

app.use(bodyParser.json());



app.get('/parties', (req, res) => {

  Parties.find({}).then(results => {
    res
      .status(200)
      .send(results)
      .end();
  }
  )

});

app.post('/users', (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  Users.find({ username }, (err, result) => {
    if (result && result[0]) {

      res.status(400).send({message: 'The username is taken!'});
    } else {

      Users.create({
        username,
        password,
        hasVoted: false
      }, (err, result) => {
        if(!err) {
          res.status(200).send(result);
        } else {
          res.status(500).send();
        }
      })

    }
  })
})

app.post('/login', (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  Users.find({ username, password }, (err, result) => {
    if (result && result[0]) {
      Sessions.find({username}, (err, sessions) => {
        if(sessions && sessions[0]) {
          res.status(200).send({sessionId: sessions[0].id});
        } else {
          Sessions.create({username}, (err, session) => {
            res.status(200).send({sessionId: session.id});
          })
        }
      })
      
    } else {

      res.status(400).send({message: 'Wrong credentials'});

    }
  })
})


app.post('/logout', (req, res) => {

  const id = req.body.id;

  Sessions.findByIdAndRemove(id,(err, result) => {

    if(result) {
      res.status(200).send();
    } else {
      res.status(400).send({message: 'No session with this id'});
    }

  })


})


// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});