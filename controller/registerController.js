const bcrypt = require("bcrypt");
const AuthModel = require("../models/authModel");
const formidable = require("formidable");
const fs = require("fs");

// ============registerUser=========
module.exports.userRegister = (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    const { userName, email, password, confirmPassword } = fields;
    const { photo } = files;
    if (password !== confirmPassword) {
      return res.json({ error: "Password does not match" });
    }
    if (password.length <= 5) {
      return res.json({ error: "Password must be 6 characters" });
    }
    if (!photo) {
      return res.json({ error: "Please provide profile picture" });
    }
    try {
      const oldUser = await AuthModel.findOne({ email: email });
      if (oldUser) {
        return res.json({ error: "User already exist" });
      }
      const newUser = await AuthModel.create({
        userName,
        email,
        password: await bcrypt.hash(password, 10),
      });

      newUser.photo.data = fs.readFileSync(photo.filepath);
      newUser.photo.contentType = photo.mimetype;

      await newUser.save((err) => {
        if (err) {
          return res.json({ error: "Not saved in DB" });
        }
        return res.json({ message: "Registration successfull" });
      });
    } catch (error) {
      console.log(error);
    }
  });
};
