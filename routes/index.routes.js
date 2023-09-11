const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("home");
});

router.get("/setting", (req, res, next) =>{
  res.render("setting")
}) 
router.get("/profile", (req, res, next) =>{
  res.render("profile")
}) 
router.get("/inventory", (req, res, next) =>{
  res.render("inventory")
}) 

router.get("/login", (req, res, next) =>{
  res.render("auth/login",  {layout: false})
})
router.get("/signup", (req, res, next) =>{
  res.render("auth/signup",{layout: false})
}) 


module.exports = router;
