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
  let user = await User.findOne({ email });
  if (!user) return { error: true, message: "User not found!" };
  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) return user;
  else return { error: true, message: "Password is wrong!" };
};

//Methods
userSchema.methods.generateTokenId = async function() {
  const user = this;
  try {
    let token = await jwt.sign({ _id: user._id.toString() }, "mySecretKey");
    user.tokens = user.tokens.concat({ token });
    user.save();
    return { user, token };
  } catch (error) {}
};

userSchema.pre("save", async function(next) {
  const user = this;
  console.log("[ERROR_START]");
  console.log({
    typeOfPassword: typeof user.password
  });
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  console.log("[ERROR_END]");

  next();
});

let User = new mongoose.model("User", userSchema);

module.exports = User;
