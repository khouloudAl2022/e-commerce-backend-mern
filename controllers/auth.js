const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
//Register
exports.RegisterUser = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).send(savedUser);
  } catch (error) {
    res.status(500).send(error);
  }
};
//login

exports.Login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).send("Wrong credentials!");
    }

    const hashPass = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SECRET
    );

    const originalPassword = hashPass.toString(CryptoJS.enc.Utf8);
    if (originalPassword !== req.body.password) {
      return res.status(401).send("Wrong credentials!");
    }

    //token
    const acessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRETKEY,
      { expiresIn: "3m" }
    );
    //hide password
    const { password, ...others } = user._doc;

    res.status(200).send({ ...others, acessToken });
  } catch (error) {
    res.status(500).send(error);
  }
};
