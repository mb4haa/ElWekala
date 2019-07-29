const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const router = express.Router();

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        following: {},
        followers: {},
        listings: {},
        likes: {},
        retweets: {},
        prefs: {}
      });
      console.log(user)
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'User Created!',
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            message: err
          });
        });
    });
});

router.post('/login', (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user == null) {
        return res.status(401).json({
          message: "No Such Email"
        });
      }
      else {
        fetchedUser = user;
        passwordBoolean = bcrypt.compare(req.body.password, user.password, function (err, res2) {
          if (res2) {
            const token = jwt.sign(
              { email: fetchedUser.email, userId: fetchedUser._id },
              'secret_this_should_be_longer',
              { expiresIn: "1h" }
            );
            return res.status(200).json({
              token: token,
              expiresIn: 3600,
              id: fetchedUser._id
            });
          }
          else if (!res2) {
            return res.status(401).json({
              message: "Invalid authentication credentials!(Password)"
            });
          }
        });
      }
    })
});

router.get('/viewProfile', (req, res, next) => {
  let fetchedUser;
  User.findOne({ _id: req.body._id })
    .then(user => {
      console.log('hoba');
      if (!user) {
        console.log('hoba1');
        return res.status(401).json({
          message: 'No user Found'
        });
      }
      fetchedUser = user;
      res.status(200).json({
        user: fetchedUser,
        message: "Found"
      });
    }).catch(err => {
      return res.status(401).json({
        message: err
      });
    });
});

module.exports = router
