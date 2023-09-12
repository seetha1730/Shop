// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
let hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);


hbs.registerHelper("inc", function(value, options)
{
    return parseInt(value) + 1;
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });
  
// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "point-of-sale";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const homeRoutes = require("./routes/home.routes");
app.use("/", homeRoutes);

const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);


const productRoutes = require('./routes/product.routes'); 
app.use('/', productRoutes); 

const categoryRoutes = require('./routes/category.routes'); 
app.use('/', categoryRoutes); 

const apiRoutes = require('./routes/API.routes'); 
app.use('/', apiRoutes);


const authRoutes = require('./routes/auth.routes'); 
app.use('/', authRoutes);



app.disable('etag')

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
