const express = require('express');
const router = express.Router();
const Product = require('../models/Product.model');
const Category = require('../models/Category.model');
const fileUploader = require('../config/cloudinary.config');



// Display the form for adding a new product
router.get('/product/add-product', (req, res, next) => {
  Category.find()
    .then(categoryList => {
      console.log("CATEGORY" ,categoryList); // Add this line for debugging
      res.render('product/add-product', { categoryList });
    })
    .catch(err => next(err));
});

// POST request to add a new product
router.post('/product/add-product', fileUploader.single('image'), (req, res) => {
  if (!req.file) {
    // Handle the case where no file was uploaded (optional)
    res.status(400).send('No file uploaded.');
    return;
  }

  const { productName, productPrice, quantity, categoryName, stock, description } = req.body;
  const imageUrl = req.file.path; // Cloudinary image URL

  Product.create({
    productName,
    productPrice,
    categoryName,
    quantity,
    stock,
    description,
    imageUrl,
  })
    .then(() => {
      console.log('Product added successfully');
      res.redirect('/product'); // Redirect to the product list page
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error adding the product');
    });
});

// GET request to display the product list
router.get('/product', (req, res, next) => {
  Product.find()
  .populate('categoryName')
    .then(productList => {
      console.log(productList)
      res.render("product/product", { productList });
    
      
      })
     
    
    .catch(err => console.log(err));
});

// GET request to display the edit product page
router.get('/product/:id/edit', (req, res, next) => {
  const { id } = req.params;

  Product.findById(id)
    .then(product => {
      res.render("product/edit-product", { product });
    })
    .catch(err => {
      next(err);
    });
});

// POST request to edit a product
router.post('/product/:id/edit', fileUploader.single('image'), (req, res, next) => {
  const { id } = req.params;
  const { productName, productPrice, quantity, categoryName, stock, description } = req.body;
  const imageUrl = req.file.path;

  Product.findByIdAndUpdate(id, { productName, productPrice, quantity, categoryName, stock, description, imageUrl })
    .then(() => {
      res.redirect('/product');
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});

// POST request to delete a product
router.post('/product/:id/delete', (req, res, next) => {
  const { id } = req.params;

  Product.findByIdAndRemove(id)
    .then(() => {
      res.redirect('/product');
    })
    .catch(err => {
      next(err);
    });

});

module.exports = router;
