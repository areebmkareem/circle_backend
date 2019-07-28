let mongoose = require("mongoose");

let Todo = mongoose.model("Todo", {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  },
  createdAt: {
    type: String,
    required: true
  }
});

module.exports = {
  Todo
};
