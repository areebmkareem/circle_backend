const mongoose = require("mongoose");

const circleSchema = mongoose.Schema({
  name: {
    type: String
  },
  circle_admin: {
    type: String
  },
  members: [
    {
      _id: {
        type: String
      }
    }
  ]
});

let Circle = new mongoose.model("Circle", circleSchema);

module.exports = Circle;
