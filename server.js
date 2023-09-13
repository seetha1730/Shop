const app = require("./app");

const express = require('express');
const bodyParser = require('body-parser');


// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT || 3000;



// Middleware to parse JSON data
app.use(bodyParser.json());

// Serve static files (e.g., HTML, CSS, and client-side JS)
app.use(express.static('public'));



app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
