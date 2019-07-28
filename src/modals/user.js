const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  tokens: [
    {
      token: {
        type: String,
        require: true
      }
    }
  ]
});

userSchema.statics.getCredentials = async function(email, password) {
  console.log("[getCredentials]", { email, password });
  let user = await User.findOne({ email });
  if (!user) return false;
  console.log(user, user.password, "***************************************");
  let isMatch = await bcrypt.compare(password, user.password);
  console.log(isMatch, "::");
  if (isMatch) return user;
  else return false;
};

//Methods
userSchema.methods.generateTokenId = async function() {
  const user = this;
  // console.log("[generateTokenId]", user);
  let token = await jwt.sign({ _id: user._id.toString() }, "mySecretKey");
  user.tokens = user.tokens.concat({ token });
  return token;
};

userSchema.pre("save", async function(next) {
  const user = this;
  console.log("[PRE]", user);
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

let User = new mongoose.model("User", userSchema);

module.exports = User;
