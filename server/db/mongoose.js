const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

console.log(process.env.MONGOLAB_URI);
mongoose.connect(
  process.env.MONGOLAB_URI || "mongodb://localhost:27017/TodoApp"
);

module.exports = {
  mongoose
};
