const express = require("express");
const { signUp, signOut, getPage } = require("../services");
const router = express.Router();
const passport = require("passport");
const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../middleware/checkAuth");

router.get("/", checkAuthenticated, getPage);
router.post(
  "/signin",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signin",
    failureFlash: true,
  })
);
router.post("/signup", checkNotAuthenticated, signUp);
router.delete("/signout", signOut);

module.exports = router;
