const { Payment } = require("../controllers/stripe");

const router = require("express").Router();

router.post("/payment", Payment);

module.exports = router;
