const {
  EditUSer,
  DeleteUser,
  GetUser,
  GetAllUser,
  GetStats,
} = require("../controllers/user");
const {
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require("../middlewars/verifyToken");

const router = require("express").Router();
//edit
router.put("/:id", verifyTokenAndAuth, EditUSer);
router.delete("/:id", verifyTokenAndAuth, DeleteUser);
router.get("/find/:id", verifyTokenAndAdmin, GetUser);
router.get("/", verifyTokenAndAdmin, GetAllUser);
router.get("/stats", verifyTokenAndAdmin, GetStats);


module.exports = router;
