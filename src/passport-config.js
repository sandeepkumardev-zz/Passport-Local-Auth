const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { Users } = require("./services");

function getUserById(id) {
  return Users.find((user) => user.id === id);
}

function getUserByUsername(username) {
  return Users.find((user) => user.username === username);
}

const initPassport = () => {
  async function authenticateUser(username, password, done) {
    const user = getUserByUsername(username);

    if (user == null) {
      return done(null, false, { message: "No user with that username!" });
    }

    const doMatch = await bcrypt.compare(password, user.password);

    if (doMatch) {
      return done(null, user);
    } else {
      console.log("Wrong password");
      return done(null, false, { message: "Wrong password!" });
    }
  }

  passport.use(new LocalStrategy(authenticateUser));

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id));
  });
};

module.exports = initPassport;
