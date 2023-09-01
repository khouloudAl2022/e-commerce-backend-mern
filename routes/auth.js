const { RegisterUser, Login } = require("../controllers/auth");

const router = require("express").Router();

//Register user

router.post("/register", RegisterUser);
//Login
router.post("/login", Login);

module.exports = router;
