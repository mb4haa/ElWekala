const express = require('express');
const router = express.Router();

const Product = require('../models/product');
const User = require('../models/user');
const checkAuth = require('../middleware/check-auth');


router.post("/addProduct", checkAuth, (req, res, next) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    seller: req.body.uid,
    price: req.body.price,
    size: req.body.size,
    condition: req.body.condition,
    category: "",
    tags: req.body.tags,
    sellerName:req.body.sellerName,
    sellerEmail:req.body.sellerEmail
  });

  product.save().then(createdProd => {
    if (createdProd) {
      console.log("Prod created and searching for user")
      User.findById(req.body.uid, function (err, foundUser) {
        if (foundUser) {

          console.log("User found")
          console.log(createdProd._id)
          foundUser.listings.push((createdProd._id))
          foundUser.save(function (err, user) {
            if (err) {
              return res.status(401).json({
                message: err
              });
            }
            else {
              res.status(201).json({
                message: 'Prod added succesfully',
                prod: {
                  createdProd,
                  id: createdProd._id
                },
                user: user
              });
            }
          })
        }
        else {
          return res.status(401).json({
            message: err
          });
        }

      })
    }
  }).catch(err => {
    res.status(500).json({
      message: err
    });
  });
});

router.patch('/getProducts', (req, res, next) => {
  page = req.body.pageNumber
  Product.find().sort({lastShare:-1}).then(products => {
    if (!products) {
      return res.status(404).json({
        message: 'No products Found'
      })
    }
    console.log(products)
    products = products.slice((page*5),(page*5)+5)
    res.status(200).json({
      products: products
    });
  })
});

router.patch('/getProductById', (req, res, next) => {
  Product.findById(req.body._id).then(product => {
    if (!product) {
      return res.status(404).json({
        message: 'No product Found'
      })
    }
    res.status(200).json({
      product: product
    });
  });
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
                    return res.status(200).json({ message: "Product updated",user:MyUser })
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
              likedProd.date = Date.now()
              likedProd.shares = likedProd.shares + 1
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

router.delete("/deleteProduct/:id", checkAuth, (req, res, next) => {

  Product.findById(req.params.id).then(result => {
    if (!result) {
      return res.status(404).json({
        message: 'No such product'
      });
    }
    if (result.seller != req.body._id) {
      return res.status(401).json({
        message: 'Not your product bro'
      });
    }
    User.findByIdAndUpdate(req.body._id, {
      $pull: { listings: req.params.id }
    }).then(result => {
      console.log();
    });
    Product.findByIdAndRemove(req.params.id).then(result => {
      if (!result) {
        return res.status(404).json({
          message: "Product not found"
        });
      }
      return res.status(201).json({
        message: "Product deleted"
      });
    });
  });
});

router.patch("/editProduct/:id", checkAuth, (req, res, next) => {

  Product.findById(req.params.id).then(result => {
    if (!result) {
      return res.status(404).json({
        message: 'No such product'
      });
    }
    if (result.seller != req.body._id) {
      return res.status(401).json({
        message: 'Not your product bro'
      });
    }
    Product.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      price: req.body.price,
      size: req.body.size,
      category: req.body.category,
      condition: req.body.condition,
      tags: req.body.tags
    }).then(result => {
      if (!result) {
        return res.status(404).json({
          message: "Product not found"
        });
      }
      return res.status(201).json({
        message: "Product updated"
      });
    });
  });
});

router.patch("/addToCart/:id", checkAuth, (req, res, next) => {
  console.log('eheendjakndkjand');  
  prodId = req.params.id
    console.log(prodId);
    myId = req.body.uid
    console.log(myId);
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
  router.patch('/getProductComments/:id',checkAuth,(req,res,next)=>{
    prodId = req.params.id
    myId = req.body.uid
    Product.findById(prodId,function(err,Product){
      if(Product){
        return res.status(201).json({comments:Product.comments})
      }
      else{
        return res.status(401).json({message:"Product not found"})
      }
    })
  })
  router.post('/addComment/:id',checkAuth,(req,res,next)=>{
    prodId = req.params.id
    myId = req.body.uid
    commenter = req.body.name
    comment = req.body.comment
    full = commenter + "," + comment
    Product.findById(prodId,function(err,Product){
      if(Product){
        Product.comments.push(full)
        Product.save(function(err,Saved){
          if(Saved){
            return res.status(201).json({message:"Comment added",Product:Product})
          }else{
            return res.status(401).json({message:'failed to save new commented product'})
          }
        })
      }
      else{
        return res.status(401).json({message:"Product not found"})
      }
    })
  })

  router.patch('/getListings', (req, res, err) => {
    User.findById(req.body._id).then(user => {
      if(!user){
        return res.status(404).json({
          message: "user not found"
        });
      }
      else{
        Product.find({seller: req.body._id}).then(products => {
          if(!products){
            return res.status(404).json({
              message: 'No products'
            });
          }
          else{
            return res.status(201).json({
              products: products
            });
          }
        });
      }
    });
  });

module.exports = router;