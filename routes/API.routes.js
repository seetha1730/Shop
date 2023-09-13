const express = require('express');
const router = express.Router();
const Product = require('../models/Product.model');

let shoppingCart =[]
router.get('/search/:searchTerm', (req, res, next) => {

    const {searchTerm}=req.params
    
     Product.find({ productName: { $regex: searchTerm, $options: 'i' } }) // Case-insensitive search
      .then(searchResults => {
    
           res.json(searchResults); // Send the search results as JSON
      })
       .catch(err => next(err));
  });

  router.post('/cart/add', (req, res) => {
    const product = req.body;
    const findProduct = shoppingCart.find(item => item._id === product._id);
    if(!findProduct){
      shoppingCart.push({...product, noItems: 1});
    }else {
      findProduct.noItems ++
    }
    
    res.json({ message: 'Product added to cart', cart: shoppingCart });
  });

  router.get('/cart/contents', (req, res) => {
 
    res.json(shoppingCart);
  });

  // Increment the quantity of a product in the cart
  router.get('/cart/increment/:id', (req, res) => {
    const {id} = req.params;
    const findProduct = shoppingCart.find(item => item._id === id);
  
    if (findProduct) {
      findProduct.noItems++;
      res.json({ message: 'Product quantity incremented', cart: shoppingCart });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  });

// Decrement the quantity of a product in the cart
router.get('/cart/decrement/:id', (req, res) => {
  const {id} = req.params;
  const findProduct = shoppingCart.find(item => item._id === id);

  if (findProduct) {
    if (findProduct.noItems > 1) {
      findProduct.noItems--;
      res.json({ message: 'Product quantity decremented', cart: shoppingCart });
    } else {
      // Remove the product from the cart if quantity is 1
      shoppingCart = shoppingCart.filter((item) => item._id !== id);
      res.json({ message: 'Product removed from cart', cart: shoppingCart });
    }
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});
   
   
module.exports = router;