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
      name: {
        type: String
      },
      userId: {
        type: String
      }
    }
  ]
});

let Circle = new mongoose.model("Circle", circleSchema);

module.exports = Circle;
