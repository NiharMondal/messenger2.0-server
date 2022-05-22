const bcrypt = require("bcrypt");
const AuthModel = require("../models/authModel");
const formidable = require("formidable");
const fs = require("fs");
const jwt = require("jsonwebtoken");

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
    if (Object.keys(files).length === 0) {
      return res.json({ error: "Please provide profile picture" });
    }
    try {
      const oldUser = await AuthModel.findOne({ email: email });
      if (oldUser) {
        return res.json({ error: "User already exist" });
      }

      const contentType = photo.mimetype;
      const data = fs.readFileSync(photo.filepath);
      const createUser = await AuthModel.create({
        userName,
        email,
        password: await bcrypt.hash(password, 10),
        photo: {
          contentType,
          data,
        },
      });
      await createUser.save((err) => {
        if (!err) {
          const token = jwt.sign(
            {
              email: createUser.email,
              id: createUser._id,
            },
            process.env.SECRET,
            { expiresIn: process.env.TOKEN_EXPIRES }
          );

          res
            .status(201)
            .cookie("authToken", token)
            .json({ success: "Registration successfull", token });
        }
      });
    } catch (e) {
      return res.status(500).json({ error: "Internal server error" });
    }
  });
};

//===========login user==============
module.exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Provide your email address" });
  }
  if (!password) {
    return res.status(400).json({ error: "Fill the password field" });
  }
  try {
    const checkUser = await AuthModel.findOne({ email: email });
    if (!checkUser) {
      return res.status(404).json({ erro: "User does not exist" });
    }
    const matchPass = await bcrypt.compare(password, checkUser.password);
    if (!matchPass) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        email: checkUser.email,
        id: checkUser._id,
      },
      process.env.SECRET,
      { expiresIn: process.env.TOKEN_EXPIRES }
    );

    res
      .status(201)
      .cookie("authToken", token)
      .json({ success: "Login successfull", token });
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
};
