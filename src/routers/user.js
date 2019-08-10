const express = require("express");
const User = require("../modals/user");
const router = new express.Router();
const circleMethods = require("./circle");

router.post("/register", async (req, res) => {
  console.log("[/register]", { req });
  const { name, password, email } = req.body;
  let user = new User({
    name,
    email,
    password
  });
  let data = await user.generateTokenId();
  circleMethods.createCircle(data.user._id);
  user.save();
  res.send({ token: data.token });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let user = await User.getCredentials(email, password);
  if (user) {
    let data = await user.generateTokenId();
    res.send({ token: data.token });
  } else res.send({ error: true });
});

module.exports = router;
