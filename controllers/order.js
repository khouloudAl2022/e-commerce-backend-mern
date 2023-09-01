const Order = require("../models/Order");

// CREATE
exports.CreateOrder = async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).send(savedOrder);
  } catch (error) {
    res.status(500).send(error);
  }
};
//UPADATE
exports.EditOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedOrder);
  } catch (err) {
    res.status(500).send(err);
  }
};
// //DELETE
exports.DeleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).send("Order has been deleted ...");
  } catch (error) {
    res.status(500).send("server error");
  }
};
//GET USER ORDERS
exports.GetUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send("server error");
  }
};
//GET ALL
exports.GetAllOrder = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};
// GET MONTHLY INCOME
exports.getIncome = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      { $group: { _id: "$month", total: { $sum: "$sales" } } },
    ]);
    res.status(200).send(income);
  } catch (error) {
    res.status(500).send(error);
  }
};
