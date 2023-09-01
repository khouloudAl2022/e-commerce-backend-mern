const User = require("../models/User");
//EDIT
exports.EditUSer = async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedUser);
  } catch (err) {
    res.status(500).send(err);
  }
};
//DELETE USER
exports.DeleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("User has been deleted...");
  } catch (error) {
    res.status(500).send(error);
  }
};
//GET USER
exports.GetUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).send(others);
  } catch (error) {
    res.status(500).send("server error");
  }
};
//GET ALL USERS
exports.GetAllUser = async (req, res) => {
  const query = req.query.new;

  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(1)
      : await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send("server error");
  }
};
//GET USER STATS
exports.GetStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  const pipeline = [
    { $match: { createdAt: { $gt: lastYear } } },
    { $project: { month: { $month: "$createdAt" } } },
    { $group: { _id: "$month", total: { $sum: 1 } } },
  ];
  try {
    const data = await User.aggregate(pipeline);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
};
