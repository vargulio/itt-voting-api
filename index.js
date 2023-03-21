const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Parties = require('./party.model');
const Users = require('./user.model');
const Sessions = require('./session.model');
const Results = require('./results.model');

const bodyParser = require('body-parser');

mongoose.connect('mongodb+srv://admin:admin@cluster0.m5cjunj.mongodb.net/voting_db?retryWrites=true&w=majority').then(res => {
  console.log('connected to mongo!');
})
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, identity, partyName");
  next();
});


app.use(bodyParser.urlencoded());

app.use(bodyParser.json());



app.get('/parties', (req, res) => {

  const sessionId = req.get('identity');
  console.log('sessionId', sessionId);
  if (!sessionId) {
    res.status(401).send({ message: 'You are not logged in' });
  } else {
    Sessions.findById(sessionId, (err, session) => {
      if (!session) {
        res.status(401).send({ message: 'You are not logged in' });

      } else {
        Parties.find({}).then(results => {
          res
            .status(200)
            .send(results.map(i => ({ name: i.name, slogan: i.slogan, picture: i.picture, id: i.id })))
            .end();
        })
      }



    })
  }



});



app.get('/parties-search', (req, res) => {

  const sessionId = req.get('identity');
  const keyword = req.get('partyName');

  if (!sessionId) {
    res.status(401).send({ message: 'You are not logged in' });
  } else {
    Sessions.findById(sessionId, (err, session) => {
      if (!session) {
        res.status(401).send({ message: 'You are not logged in' });

      } else {

        if (keyword === undefined) {
          res.status(400).send({ message: 'You have to provide search criteria' });
        } else {

          Parties.find({ name: { $regex: keyword, $options: 'i' } }, (err, results) => {

            res.status(200).send(results.map(i => ({ name: i.name, slogan: i.slogan, picture: i.picture, id: i.id })));

          })
        }


      }
    })
  }
});

app.get('/party/:id', (req, res) => {

  const sessionId = req.get('identity');
  const partyId = req.params.id;

  if (!sessionId) {
    res.status(401).send({ message: 'You are not logged in' });
  } else {
    Sessions.findById(sessionId, (err, session) => {
      if (!session) {
        res.status(401).send({ message: 'You are not logged in' });

      } else {


        Parties.findById(partyId, (err, result) => {
          if (!result) {
            res.status(404).send({ message: 'There is no such party' });
          } else {
            res.status(200).send(result);
          }

        })
      }
    })
  }
});

app.post('/vote/:id', async (req, res) => {

  const sessionId = req.get('identity');
  const partyId = req.params.id;

  const session = await Sessions.findById(sessionId).catch(e => {
    console.log('Ne namiram takava sessia');
  });
  if (!session) {
    res.status(401).send({ message: 'You are not logged in' });
    return;
  }

  const party = await Parties.findById(partyId).catch(e => {
    console.log('Greshka v turseneto na partiq');
  })

  if (!party) {
    res.status(400).send({ message: 'No such party!' });
    return;
  }

  const user = await Users.find({ username: session.username }).catch(e => {
    console.log('Greshka v tyrseneto na user');
  })
  if (!user[0]) {
    res.status(400).send({ message: 'No such user!' });
    return;
  }

  if (user[0].hasVoted) {
    res.status(406).send({ message: 'You cannot vote twice' });
    return;
  }

  // update the hasVoted prop of the user
  await Users.findOneAndUpdate({ username: session.username }, { hasVoted: true });

  const results = await Results.find({ partyId }).catch(e => {
    console.log('Error when updating results');
  });



  if (results && results.length === 0) {
    await Results.create({ partyId, voters: 1 }).catch(e => {
      res.status(500).send({ message: 'Error when creating new result entry' });
    });
  } else {
    await Results.findOneAndUpdate({ partyId }, { voters: results[0].voters + 1 }).catch(e => {
      res.status(500).send({ message: 'Error when updating result entry' });
    })
  }
  res.status(200).send({message: "You voted successfully"});
});


app.get('/results', (req, res) => {

  const sessionId = req.get('identity');

  if (!sessionId) {
    res.status(401).send({ message: 'You are not logged in' });
  } else {
    Sessions.findById(sessionId, (err, session) => {
      if (!session) {
        res.status(401).send({ message: 'You are not logged in' });

      } else {
        Results.find({}).then(results => {
          res
            .status(200)
            .send(results.map(i => ({ partyId: i.partyId, voters: i.voters })))
            .end();
        })
      }



    })
  }



});

app.post('/users', (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  if(!username || !password) {
    res.status(400).send({message: "This is not a valid JSON or required fields are missing"});
    return;
  }

  Users.find({ username }, (err, result) => {
    if (result && result[0]) {

      res.status(400).send({ message: 'The username is taken!' });
    } else {

      Users.create({
        username,
        password,
        hasVoted: false
      }, (err, result) => {
        if (!err) {
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

  if(!username || !password) {
    res.status(400).send({message: "This is not a valid JSON or required fields are missing"});
    return;
  }

  Users.find({ username, password }, (err, result) => {
    if (result && result[0]) {
      const {hasVoted, username} = result[0];
      Sessions.find({ username }, (err, sessions) => {
        if (sessions && sessions[0]) {
          res.status(200).send({ sessionId: sessions[0].id, hasVoted, username });
        } else {
          Sessions.create({ username }, (err, session) => {
            res.status(200).send({ sessionId: session.id, hasVoted, username });
          })
        }
      })

    } else {

      res.status(400).send({ message: 'Wrong credentials' });

    }
  })
})


app.post('/logout', (req, res) => {

  const id = req.body.id;

  if(!id) {
    res.status(400).send({message: "This is not a valid JSON or required fields are missing"});
    return;
  }

  Sessions.findByIdAndRemove(id, (err, result) => {

    if (result) {
      res.status(200).send();
    } else {
      res.status(400).send({ message: 'No session with this id' });
    }
  })
});






// Start the server
const PORT = process.env.PORT || 8080;
// localhost:8080
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});