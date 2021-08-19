const bcrypt = require("bcryptjs");

let Users = [
  {
    id: "1629352909823",
    username: "sandeep",
    password: "$2a$12$CDT8UstbWKNDzVjbmtDWnuDeZVZhd4S3nnRhbXCkAyT/4vgUNf.y2",
  },
];

const getPage = (request, response) => {
  response.json("GET response");
};

const signUp = async (request, response) => {
  const { username, password } = request.body;

  const newUser = {
    id: Date.now().toString(),
    username,
    password: await bcrypt.hash(password, 12),
  };

  Users.push(newUser);
  response.send(newUser);
};

const signOut = async (request, response) => {
  request.logOut();
  response.redirect("/signin");
};

module.exports = { Users, getPage, signUp, signOut };
