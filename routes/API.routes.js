const express = require('express');
const router = express.Router();
const Product = require('../models/Product.model');

router.get('/search/:searchTerm', (req, res, next) => {

    const {searchTerm}=req.params
    
     Product.find({ productName: { $regex: searchTerm, $options: 'i' } }) // Case-insensitive search
      .then(searchResults => {
    
           res.json(searchResults); // Send the search results as JSON
      })
       .catch(err => next(err));
  });

module.exports = router;