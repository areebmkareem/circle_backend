const express = require("express");
const User = require("../modals/user");
const router = new express.Router();

router.post("/register", async (req, res) => {
  console.log("[/register]", { req });
  const { name, password, email } = req.body;
  let user = new User({
    name,
    email,
    password
  });
  let token = await user.generateTokenId();
  user.save();
  res.send({ token });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let user = await User.getCredentials(email, password);
  if (user) {
    let token = await user.generateTokenId();
    res.send({ token });
  } else res.send({ error: true });
});

module.exports = router;
