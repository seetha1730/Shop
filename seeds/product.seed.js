// Iteration #1
const mongoose = require('mongoose');
const Product = require('../models/Product.model');

const product = [
  { name: "", propellers: 3, maxSpeed: 12 },
  { name: "Racer 57", propellers: 4, maxSpeed: 20 },
  { name: "Courier 3000i", propellers: 6, maxSpeed: 18 }
];

const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/point-of-sale";

  mongoose
  .connect(MONGO_URI)
  .then(x => {
    console.log(`Connected to Mongo database: "${x.connections[0].name}"`);
 
    // Create new documents in the movie collection
    return Product.create(product);
  })
  .then(productsFromDB => {
    console.log(`Created ${productsFromDB.length} product`);
 
    // Once the documents are created, close the DB connection
    return mongoose.connection.close();
  })
  .then(() => {
    // Once the DB connection is closed, print a message
    console.log('DB connection closed!');
  })
  .catch(err => {
    console.log(`An error occurred while creating books from the DB: ${err}`);
  });