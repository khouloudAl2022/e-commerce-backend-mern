const {
  CreateOrder,
  EditOrder,
  DeleteOrder,
  GetUserOrders,
  GetAllOrder,
  getIncome,
} = require("../controllers/order");
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuth,
  verifyToken,
} = require("../middlewars/verifyToken");

const router = require("express").Router();

router.post("/", verifyToken, CreateOrder);
router.put("/:id", verifyTokenAndAdmin, EditOrder);
router.delete("/:id", verifyTokenAndAdmin, DeleteOrder);
router.get("/find/:userId", verifyTokenAndAuth, GetUserOrders);
router.get("/", verifyTokenAndAdmin, GetAllOrder);
router.get("/income", getIncome);

module.exports = router;
