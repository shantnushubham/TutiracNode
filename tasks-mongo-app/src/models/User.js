const { model } = require("mongoose");
const validator = require("validator");

const User = model("User", {
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
    validator: {
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
});

module.exports = User;
