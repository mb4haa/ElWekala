const express = require('express');
const router = express.Router();

const Product = require('../models/product');
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


module.exports = router;