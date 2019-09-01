const express = require("express");
const User = require("../modals/user");
const router = new express.Router();
const circleMethods = require("./circle");
const auth = require("../middleware/auth");

router.post("/request", auth, (req, res) => {
  // username
  // circle id
  // userId
});

module.exports = router;
