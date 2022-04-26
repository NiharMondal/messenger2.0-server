const AuthModel = require("../models/authModel");
const formidable = require("formidable");
const validator = require("validator");

module.exports.userRegister = async (req, res) => {
  const { userName, email, password, confirmPassword, image } = req.body;
  try {
    const result = await AuthModel.create({
      userName,
      password,
      email,
      confirmPassword,
      image,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};
