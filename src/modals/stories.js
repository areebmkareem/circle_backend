const mongoose = require("mongoose");

const storiesSchema = mongoose.Schema({
  story: {
    type: String
  },
  author: {
    _id: {
      type: String
    },
    name: {
      type: String
    }
  },
  createdAt: {
    type: String,
    default: new Date()
  }
});

let Stories = new mongoose.model("Stories", storiesSchema);

module.exports = Stories;
