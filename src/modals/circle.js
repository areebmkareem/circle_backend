const mongoose = require("mongoose");

const circleSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  circle_admin: {
    type: String,
    require: true,
    unique: true
  },
  members: [
    {
      _id: {
        type: String,
        require: true
      }
    }
  ]
});

let Circle = new mongoose.model("Circle", circleSchema);

module.exports = Circle;
