const Cart = require("../models/Cart");

// CREATE
exports.CreateCart = async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).send(savedCart);
  } catch (error) {
    res.status(500).send(error);
  }
};
//UPADATE
exports.EditCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).send(updatedCart);
  } catch (error) {
    res.status(500).send(error);
  }
};

// //DELETE
exports.DeleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).send("Cart has been deleted ...");
  } catch (error) {
    res.status(500).send("server error");
  }
};
//GET USER CART
exports.GetUserCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send("server error");
  }
};
//GET ALL
exports.GetAllCart = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).send(carts);
  } catch (error) {
    res.status(500).send(error);
  }
};
