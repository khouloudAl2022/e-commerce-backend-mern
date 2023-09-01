const {
  EditProduct,
  DeleteProduct,
  GetProduct,
  GetAllProduct,
  CreateProduct,
} = require("../controllers/product");
const { verifyTokenAndAdmin } = require("../middlewars/verifyToken");

const router = require("express").Router();

router.post("/",verifyTokenAndAdmin, CreateProduct);
router.put("/:id", verifyTokenAndAdmin, EditProduct);
router.delete("/:id", verifyTokenAndAdmin, DeleteProduct);
router.get("/find/:id", GetProduct);
router.get("/", GetAllProduct);

module.exports = router;
