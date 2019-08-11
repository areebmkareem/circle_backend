const express = require("express");
const Circle = require("../modals/circle");
const router = new express.Router();

const createCircle = userId => {
  let cicle = new Circle({
    name: "circle",
    circle_admin: userId
  });
  cicle.save();
};
router.get("/circles", async (req, res) => {
  const { userId } = req.body;
  try {
    let data = await Circle.find({ circle_admin: userId });
    res.send(data);
  } catch (error) {
    res.send("");
  }
});

module.exports = {
  router,
  createCircle
};
