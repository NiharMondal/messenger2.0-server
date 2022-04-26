// ----------------------------------------

const { model, Schema } = require("mongoose");

const registerSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "Enter User Name"],
    },
    email: {
      type: String,
      required: [true, "Enter email address"],
    },
    password: {
      type: String,
      required: [true, "Password must be 6 character"],
    },
    confirmPassword: {
      type: String,
      required: [true, "Password doesn't match"],
    },
  },
  { timestamps: true }
);

module.exports = model("User", registerSchema);
