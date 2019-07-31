const express = require('express');
const router = express.Router();

const Product = require('../models/product');
const User = require('../models/user');

router.patch('/filter', (req, res, next) => {
    Product.find({
        size: {$in: req.body.size.split(',')},
        price: {$gte: req.body.lowerBound, $lte: req.body.upperBound},
        condition: {$in: req.body.condition.split(',')},
        tags: {$in: req.body.tags.split(',')},
        category: req.body.category
    }).then(products => {
        if (!products) {
            return res.status(404).json({
                message: 'No products Found'
            })
        }
        res.status(201).json({
            products: products
        });
    })
});

module.exports = router;