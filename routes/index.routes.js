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
router.get("/category", (req, res, next) =>{
  res.render("category")
}) 
router.get("/product", (req, res, next) =>{
  res.render("product")
})
router.get("/login", (req, res, next) =>{
  res.render("login",  {layout: false})
})
router.get("/signup", (req, res, next) =>{
  res.render("signup")
}) 
router.get("*", (req, res) => {

  res.send("Page not found - 404")

})

module.exports = router;
