const formidable = require("formidable");
const validator = require("validator");
module.exports.userRegister = (req, res) => {
  const form = formidable();
  form.parse(req, (error, fields, files) => {
    const { userName, email, password, confirmPassword } = fields;
    const { profilePic } = files;
    const errors = [];

    if (!userName) {
      errors.push("Enter your Name");
    }
    if (!email) {
      errors.push("Enter your Email address");
    }
    if (!password) {
      errors.push("Enter Password");
    }
    if (!confirmPassword) {
      errors.push("Confirm password is not provided");
    }
    if (password && confirmPassword && password !== confirmPassword) {
      errors.push("Confirm password doesn't match");
    }
    if (password && password.length < 6) {
      errors.push("Password must be 6 charectar or more");
    }
    if (Object.keys(files).length === 0) {
      errors.push("Please provide your profile picture");
    }
    if (errors.length > 0) {
      res.json({ error: {errorMessage: errors} });
    } else {
      const getImageName = profilePic.originalFilename;
      console.log(getImageName);
    }
  });
};
