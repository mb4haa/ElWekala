const express = require('express');
const router = express.Router();

const Product = require('../models/product');
const User = require('../models/user');
const checkAuth = require('../middleware/check-auth');


router.post("/addProduct", checkAuth, (req,res,next) => {
  const product = new Product({
    name: req.body.name,
    image: "Placeholder",
    seller: req.body.uid,
    price: req.body.price,
    size: req.body.size,
    condition: req.body.condition,
    category: req.body.category,
    tags: req.body.tags
  });

  product.save().then(createdProd => {
     if(createdProd){
         console.log("Prod created and searching for user")
  User.findById(req.body.uid,function(err,foundUser){
    if(foundUser){

        console.log("User found")
        console.log(createdProd._id)
        foundUser.listings.push((createdProd._id))
        foundUser.save(function(err,user){
            if(err){
                return res.status(401).json({
                    message: err
                  });
            }
            else{
                res.status(201).json({
                    message: 'Prod added succesfully',
                    prod: {createdProd,
                      id: createdProd._id
                    },
                    user:user
                });
            }
        })
    }
    else{
        return res.status(401).json({
            message: err
          });
    }

})
     }
  }).catch( err => {
    res.status(500).json({
      message: err
    });
  });
});

router.get('/getProducts', (req, res, next) => {
  Product.find().then(products => {
    if (!products) {
      return res.status(404).json({
        message: 'No products Found'
      })
    }
    res.status(200).json({
      products: products
    });
  })
});

router.patch("/likeProduct/:id", checkAuth, (req, res, next) => {
  prodId = req.params.id
  myId = req.body.uid
  User.findById(myId, function (err, MyUser) {
    if (MyUser) {
      if (MyUser.likes.includes(prodId)) {
        return res.status(401).json({ message: "Already liked" })
      }
      else {
        MyUser.likes.push(prodId)
        MyUser.save(function (err) {
          if (err) {
            return res.status(401).json({ message: err })
          }
          else {
            Product.findById(prodId, function (err, likedProd) {
              console.log(likedProd)
              if (likedProd) {
                likedProd.likes = likedProd.likes + 1
                likedProd.save(function (err) {
                  if (err) {
                    return res.status(401).json({ message: err })
                  } else {
                    return res.status(200).json({ message: "Product updated" })
                  }
                })
              }
              else {
                return res.status(401).json({ message: err })
              }
            })
          }
        })

      }
    }
    else {
      return res.status(401).json({ message: "Login to be able to like" })
    }
  })


});

router.patch("/unlikeProduct/:id", checkAuth, (req, res, next) => {
  prodId = req.params.id
  myId = req.body.uid
  User.findById(myId, function (err, MyUser) {
    if (MyUser) {
      if (MyUser.likes.includes(prodId)) {
        index = MyUser.likes.indexOf(prodId)
        if (index > -1) {
          MyUser.likes.splice(index, 1)
          MyUser.save(function (err) {
            if (err) {
              return res.status(401).json({ message: err })
            }
            else {
              Product.findById(prodId, function (err, likedProd) {
                if (likedProd) {
                  console.log(likedProd)
                  likedProd.likes = likedProd.likes - 1
                  likedProd.save(function (err) {
                    if (err) {
                      return res.status(401).json({ message: err })
                    } else {
                      return res.status(200).json({ message: "Product updated" })
                    }
                  })
                }
                else {
                  return res.status(401).json({ message: err })
                }
              })
            }
          })
        }
      }
      else {
        return res.status(401).json({ message: "Can't unlike without liking" })
      }
    }
    else {
      return res.status(401).json({ message: "Login to be able to like" })
    }
  })


});

router.patch("/shareProduct/:id", checkAuth, (req, res, next) => {
  prodId = req.params.id
  myId = req.body.uid
  User.findById(myId, function (err, MyUser) {
    if (MyUser) {
      MyUser.retweets.push(prodId)
      MyUser.save(function (err) {
        if (err) {
          return res.status(401).json({ message: err })
        }
        else {
          Product.findById(prodId, function (err, likedProd) {
            if (likedProd) {

              likedProd.lastShare = Date.now()
              likedProd.save(function (err) {
                if (err) {
                  return res.status(401).json({ message: err })
                } else {
                  return res.status(200).json({ message: "Product updated" })
                }
              })
            }
            else {
              return res.status(401).json({ message: err })
            }
          })
        }
      })
    }
    else {
      return res.status(401).json({ message: "Login to be able to like" })
    }
  })
});

router.patch("/addToCart/:id", checkAuth, (req, res, next) => {
    prodId = req.params.id
    myId = req.body.uid
    User.findById(myId, function (err, MyUser) {
      if (MyUser) {
        if(!MyUser.cart.includes(prodId)){
            MyUser.cart.push(prodId)
            MyUser.save(function(err,MyUser){
                if(err){
                return res.status(401).json({ message: err })
                }
                else{
                return res.status(201).json({User:MyUser})
                }
            })
        }
        else{
            return res.status(401).json({message:"Already In Cart"})
        }
      }
      else {
        return res.status(401).json({ message: "Login to be able to add to cart" })
      }
    })
  });

  router.patch("/removeFromCart/:id", checkAuth, (req, res, next) => {
    prodId = req.params.id
    myId = req.body.uid
    User.findById(myId, function (err, MyUser) {
      if (MyUser) {
        if(MyUser.cart.includes(prodId)){
            index = MyUser.cart.indexOf(prodId)
            if(index > -1){
                MyUser.cart.splice(index,1)
            }
            MyUser.save(function(err,MyUser){
                if(err){
                return res.status(401).json({ message: err })
                }
                else{
                return res.status(201).json({User:MyUser})
                }
            })
        }
        else{
            return res.status(401).json({message:"Not In Cart"})
        }
      }
      else {
        return res.status(401).json({ message: "Login to be able to un-cart" })
      }
    })
  });

module.exports = router;