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

 // Sample shopping cart data (in-memory)
let shoppingCart = [];

// Add a product to the shopping cart
router.post('/cart/add', (req, res) => {
  const product = req.body;
  shoppingCart.push(product);
  res.json({ message: 'Product added to cart', cart: shoppingCart });
});

// Increment the quantity of a product in the cart
router.put('/cart/increment/:productId', (req, res) => {
  const productId = req.params.productId;
  const product = shoppingCart.find((item) => item.id === productId);
  if (product) {
    product.quantity++;
    res.json({ message: 'Product quantity incremented', cart: shoppingCart });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Decrement the quantity of a product in the cart
router.put('/cart/decrement/:productId', (req, res) => {
  const productId = req.params.productId;
  const product = shoppingCart.find((item) => item.id === productId);
  if (product) {
    if (product.quantity > 1) {
      product.quantity--;
      res.json({ message: 'Product quantity decremented', cart: shoppingCart });
    } else {
      // Remove the product from the cart if quantity is 1
      shoppingCart = shoppingCart.filter((item) => item.id !== productId);
      res.json({ message: 'Product removed from cart', cart: shoppingCart });
    }
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});
   
   
module.exports = router;