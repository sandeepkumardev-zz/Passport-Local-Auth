const express = require("express");
const passport = require("passport");
const initializePassport = require("../passport-config");
const app = express();
const flash = require("express-flash");
const session = require("express-session");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
initializePassport();

app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(require("../routes"));

module.exports = app;
