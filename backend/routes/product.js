const express = require('express');
const router = express.Router();

const Product = require('../models/product');
const User = require('../models/user');
const checkAuth = require('../middleware/check-auth');

router.post("/addProduct", checkAuth, (req,res,next) => {
  console.log(req.body);
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
      res.status(201).json({
      message: 'Prod added succesfully',
      prod: {createdProd,
        id: createdProd._id
      }
  });
  }).catch( err => {
    res.status(500).json({
      message: err
    });
  });
});

router.get('/getProducts', (req, res, next) => {
  Product.find().then(products => {
    if(!products){
      return res.status(404).json({
        message: 'No products Found'
      })
    }
    res.status(200).json({
      products: products
    });
  })
});

router.post("/addProduct", checkAuth, (req,res,next) => {
    console.log(req.body);
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
        res.status(201).json({
        message: 'Prod added succesfully',
        prod: {createdProd,
          id: createdProd._id
        }
    });
    }).catch( err => {
      res.status(500).json({
        message: err
      });
    });
  });

  router.patch("/likeProduct/:id", checkAuth, (req,res,next) => {
    prodId = req.params.id
    myId = req.body.uid
    User.findById(myId,function(err,MyUser){
        if(MyUser){
            if(MyUser.likes.includes(prodId)){
                return res.status(401).json({message:"Already liked"})
            }
            else{
                MyUser.likes.push(prodId)
                MyUser.save(function(err){
                    if(err){
                        return res.status(401).json({message:err})
                    }
                    else{
                        Product.findById(prodId,function(err,likedProd){
                            console.log(likedProd)
                            if(likedProd){
                                likedProd.likes = likedProd.likes + 1
                                likedProd.save(function(err){
                                    if(err){
                                        return res.status(401).json({message:err})
                                    }else{
                                        return res.status(200).json({message:"Product updated"})
                                    }
                                })
                            }
                            else{
                                return res.status(401).json({message:err})
                            }
                        })
                    }
                })

            }
        }
        else{
            return res.status(401).json({message:"Login to be able to like"})
        }
    })
 

  });

  router.patch("/unlikeProduct/:id", checkAuth, (req,res,next) => {
    prodId = req.params.id
    myId = req.body.uid
    User.findById(myId,function(err,MyUser){
        if(MyUser){
            if(MyUser.likes.includes(prodId)){
                index = MyUser.likes.indexOf(prodId)
                if(index >-1){
                    MyUser.likes.splice(index,1)
                    MyUser.save(function(err){
                        if(err){
                            return res.status(401).json({message:err})
                        }
                        else{
                            Product.findById(prodId,function(err,likedProd){
                                if(likedProd){
                                    console.log(likedProd)
                                    likedProd.likes = likedProd.likes - 1
                                    likedProd.save(function(err){
                                        if(err){
                                            return res.status(401).json({message:err})
                                        }else{
                                            return res.status(200).json({message:"Product updated"})
                                        }
                                    })
                                }
                                else{
                                    return res.status(401).json({message:err})
                                }
                            })
                        }
                    })
                }
            }
            else{
                return res.status(401).json({message:"Can't unlike without liking"})
            }
        }
        else{
            return res.status(401).json({message:"Login to be able to like"})
        }
    })
 

  });


module.exports = router;