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

module.exports = {
  createCircle
};
