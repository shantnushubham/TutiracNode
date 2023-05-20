const { model, Schema } = require("mongoose");
const validator = require("validator");
const { encryptPassword, checkPassword } = require("../bcrypt");

const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    unique: true,
    validate: {
      validator(e) {
        return validator.isEmail(e);
      },
    },
  },
  age: {
    type: Number,
    require: true,
    validate: {
      validator(a) {
        if (a < 0) {
          throw new Error("Age must be +ve.");
        }
      },
    },
  },
  password: {
    type: String,
    require: true,
    trim: true,
    minlength: 8,
    validate: {
      validator(pass) {
        // 1. Password's min length should be 8 -> Done
        // 2. Password must not contain spaces, newlines and tabs.
        // 3. It cannot contain the word "password"
        debugger;
        if (pass.includes(" ") || pass.includes("\n") || pass.includes("\t")) {
          throw new Error("Password includes space/tab/newline char");
        }
        if (pass.toLowerCase().includes("password")) {
          throw new Error("Password must not contain 'password'");
        }
      },
    },
  },
  isEligible: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre("save", async function (next) {
  try {
    const user = this;
    if (user.modifiedPaths().includes("password")) {
      user.password = await encryptPassword(user.password);
    }
    next();
  } catch (err) {
    throw err;
  }
});

UserSchema.statics.findByEmailAndPasswordForAuth = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(`Login Failed.`);
    }
    const encryptedPassword = user.password;
    const isMatch = await checkPassword(password, encryptedPassword);
    if (!isMatch) {
      throw new Error("Login Failed.");
    }
    console.log("Login Success!");
    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const User = model("User", UserSchema);

module.exports = User;
