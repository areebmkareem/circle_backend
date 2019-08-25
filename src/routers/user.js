const express = require("express");
const User = require("../modals/user");
const router = new express.Router();
const circleMethods = require("./circle");
const auth = require("../middleware/auth");

router.post("/register", async (req, res) => {
  try {
    const { name, password, email } = req.body;
    if (name && password && email) {
      let user = new User({
        name,
        email,
        password
      });
      let data = await user.generateTokenId();
      circleMethods.createCircle(data.user._id);
      res.send({ success: true, token: data.token });
    } else {
      res.send({ error: true, message: "Empty data" });
    }
  } catch (error) {
    res.send({ error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let response = await User.getCredentials(email, password);
    if (!response.error) {
      let data = await response.generateTokenId();
      res.send({ success: true, token: data.token });
    } else res.send(response);
  } catch (error) {
    res.send(error);
  }
});

router.post("/logout", auth, async (req, res) => {
  try {
    let { user, token } = req;
    user.tokens = user.tokens.filter(data => data.token !== token);
    user.save();
    res.send({ success: true, message: "Successfully logged out!" });
  } catch (error) {
    res.send({ error: true, message: "Something went wrong", additionalInfo: error });
  }
});
module.exports = router;
