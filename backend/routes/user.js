const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

router.post("/signup", (req, res, next) => {
  if(req.body.firstName=='' || req.body.lastName=='' || req.body.password=='' || 
    req.body.gender=='' ){
      return res.status(401).json({message:"Insufficent Info"})
    }
   else{ 
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        image: req.body.image,
        email: req.body.email,
        password: hash,
        gender: req.body.gender,
        size: req.body.size,
        following: [],
        followers: [],
        listings: [],
        likes: [],
        retweets: [],
        prefs: []
      });
      console.log(user)
      user.save()
        .then(result => {
          return res.status(201).json({
            message: 'User Created!',
            result: result
          });
        })
        .catch(err => {
          return res.status(500).json({
            message: err
          });
        });
    });
  }
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
              { expiresIn: '4h' }
            );
            return res.status(200).json({
              token: token,
              expiresIn: '4h',
              user: fetchedUser
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

router.patch('/viewProfile', (req, res, next) => {
  let fetchedUser;
  User.findOne({ _id: req.body._id })
    .then(user => {
      if (!user) {
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

router.patch("/getUserById", (req, res, err) => {
  User.findById(req.body._id).then(user => {
    if (!user) {
      return res.status(404).json({
        message: 'User not found ' + req.body._id
      });
    }
    res.status(200).json({
      user: user
    });
  });
});

router.patch("/editProfile", checkAuth, (req, res, next) => {
  User.findById(req.body._id).then(user => {
    if (!user) {
      return res.status(404).json({
        err: null,
        msg: 'Please Login.',
        data: null
      });
    }
    User.findByIdAndUpdate(
      req.body._id,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName
      }
    ).then(result => {
      res.status(201).json({
        message: 'User Updated!'
      });
    }).catch(err => {
      res.status(500).json({
        message: err
      });
    });
  });
});

router.patch("/follow", checkAuth, (req, res, next) => {
  User.findById(req.body._id).then(user => {
    if (!user) {
      return res.status(404).json({
        err: null,
        msg: 'Wrong userId',
        data: null
      });
    }
    User.findByIdAndUpdate(
      req.body._id,
      {
        $addToSet: { following: req.body._otherId }
      }
    ).then(result => {
      res.status(201).json({
        message: 'User Updated!'
      });
    }).catch(err => {
      res.status(500).json({
        message: err
      });
    });
  });
  User.findById(req.body._otherId).then(user => {
    if (!user) {
      return res.status(404).json({
        err: null,
        msg: 'Wrong targetId',
        data: null
      });
    }
    User.findByIdAndUpdate(
      req.body._otherId,
      {
        $addToSet: { followers: req.body._id }
      }
    ).then(result => {
      res.status(201).json({
        message: 'User Updated!'
      });
    }).catch(err => {
      res.status(500).json({
        message: err
      });
    });
  });
});

router.patch("/unfollow", checkAuth, (req, res, next) => {
  User.findById(req.body._id).then(user => {
    if (!user) {
      return res.status(404).json({
        err: null,
        msg: 'Wrong userId',
        data: null
      });
    }
    User.findByIdAndUpdate(
      req.body._id,
      {
        $pull: { following: req.body._otherId }
      }
    ).then(result => {
      res.status(201).json({
        message: 'User Updated!'
      });
    }).catch(err => {
      res.status(500).json({
        message: err
      });
    });
  });
  User.findById(req.body._otherId).then(user => {
    if (!user) {
      return res.status(404).json({
        err: null,
        msg: 'Wrong targetId',
        data: null
      });
    }
    User.findByIdAndUpdate(
      req.body._otherId,
      {
        $pull: { followers: req.body._id }
      }
    ).then(result => {
      res.status(201).json({
        message: 'User Updated!'
      });
    }).catch(err => {
      res.status(500).json({
        message: err
      });
    });
  });
});

router.patch('/getFollowers', (req, res, next) => {
  let fetchedUser;
  User.findById(req.body._id)
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'No user Found'
        });
      }
      fetchedUser = user;
      res.status(200).json({
        followers: user.followers
      });
    }).catch(err => {
      return res.status(401).json({
        message: err
      });
    });
});

router.patch('/getFollowing', (req, res, next) => {
  let fetchedUser;
  User.findById(req.body._id)
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'No user Found'
        });
      }
      fetchedUser = user;
      res.status(200).json({
        following: user.following
      });
    }).catch(err => {
      return res.status(401).json({
        message: err
      });
    });
});

router.get('/getUsers', (req, res, next) => {
  User.find().then(users => {
    if (!users) {
      return res.status(404).json({
        message: 'No users Found'
      })
    }
    res.status(200).json({
      users: users
    });
  })
});

router.patch('/viewLikes', (req, res, next) => {
  User.findById(req.body._id).then(user => {
    if (!user) {
      return res.status(404).json({
        message: 'No users Found'
      })
    }
    res.status(200).json({
      likes: user.likes
    });
  })
});

router.patch('/viewPrefs', (req, res, next) => {
  User.findById(req.body._id).then(user => {
    if (!user) {
      return res.status(404).json({
        message: 'No users Found'
      })
    }
    res.status(200).json({
      prefs: user.prefs
    });
  })
});

router.patch('/viewReshares', (req, res, next) => {
  User.findById(req.body._id).then(user => {
    if (!user) {
      return res.status(404).json({
        message: 'No users Found'
      })
    }
    res.status(200).json({
      reshares: user.retweets
    });
  })
});

router.patch('/viewListings', (req, res, next) => {
  User.findById(req.body._id).then(user => {
    if (!user) {
      return res.status(404).json({
        message: 'No users Found'
      })
    }
    res.status(200).json({
      listings: user.listings
    });
  })
});

router.patch('/setPrefs', checkAuth, (req, res, next) => {
  basePrefs = req.body.prefs
  arr = basePrefs.split(",")
  console.log(arr)
  User.findById(req.body._id, function (err, foundUser) {
    if (err) {
      return res.status(401).json({ message: err })
    }
    else {
      console.log(foundUser)
      arr.forEach(element => {
        console.log(element)
        if (foundUser.prefs == null) {
          foundUser.prefs = []
        }
        foundUser.prefs.push(element)
      });
      foundUser.save(function (err, user) {
        if (err) {
          return res.status(401).json({
            message: 'No users Found'
          })
        } else {
          return res.status(201).json({ msg: user })
        }
      })
    }
  })
})

router.patch('/getPrefs', (req, res, next) => {
  User.findById(req.body._id, function (err, foundUser) {
    if (err) {
      return res.status(401).json({ message: err })
    }
    else {
      console.log(foundUser.prefs)
      return res.status(201).json({ Prefs: foundUser.prefs })
    }
  })
})


module.exports = router
