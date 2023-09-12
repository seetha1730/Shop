const express = require('express');
const router = express.Router();
const Product = require('../models/Product.model');
const Category = require('../models/Category.model');


router.get("/", (req, res, next) => {
    console.log(res)
    res.render("home");
  });





  module.exports = router;