const express = require("express");
const User = require("../modals/user");
const Circle = require("../modals/circle");
const router = new express.Router();
const circleMethods = require("./circle");

router.post("/register", async (req, res) => {
  try {
    const { name, password, email } = req.body;
    console.log("[DATA]", {
      name,
      password,
      email
    });
    let user = new User({
      name,
      email,
      password
    });
    let data = await user.generateTokenId();
    circleMethods.createCircle(data.user._id);
    res.send({ success: true, token: data.token });
  } catch (error) {
    res.send({ error });
  }
});

router.post("/login", async (req, res) => {
  try {
    let user = new User({});

    const { email, password } = req.body;
    let response = await User.getCredentials(email, password);
    if (!response.error) {
      let data = await user.generateTokenId();
      res.send({ success: true, token: data.token });
    } else res.send(response);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
