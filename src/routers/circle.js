const express = require("express");
const Circle = require("../modals/circle");
const router = new express.Router();
const auth =require("../middleware/auth")
const createCircle = userId => {
  let cicle = new Circle({
    name: "circle",
    circle_admin: userId
  });
  cicle.save();
};
router.get("/circles",auth, async (req, res) => {
  const user=req.user
  try {
    let data = await Circle.find({ circle_admin: user._id });
    res.send(data);
  } catch (error) {
    res.send("");
  }
});

module.exports = {
  router,
  createCircle
};
