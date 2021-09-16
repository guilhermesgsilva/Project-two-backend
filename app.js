// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");


// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

hbs.registerHelper("math", function(lvalue, operator, rvalue, options) {
  lvalue = parseFloat(lvalue);
  rvalue = parseFloat(rvalue);

  return {
      "+": lvalue + rvalue
  }[operator];
});

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const session = require("express-session");
app.use(
  session({
 secret: process.env.SESSION_SECRET,
 cookie: {
 sameSite: true, //both fe and be are running on the same hostname
 httpOnly: true, //we are not using https
//  maxAge: 60000, //session time
    },
    rolling: true,
  })
);

// Adding logins

function getCurrentLoggedUser(req, res, next) {
  if (req.session && req.session.currentUser) {
    app.locals.loggedInUser = req.session.currentUser.username;
  } else {
    app.locals.loggedInUser = "";
  }
  next();
}

app.use(getCurrentLoggedUser);

// default value for title local
const projectName = "Project-two-backend";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);
const auth = require("./routes/auth");
app.use("/", auth);
const plan = require("./routes/plan");
app.use("/", plan);
const poi = require("./routes/poi");
app.use("/", poi);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
