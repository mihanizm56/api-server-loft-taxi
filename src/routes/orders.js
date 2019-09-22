const express = require("express");
const ordersRouter = require("../controllers/orders/orders");

const router = express.Router();

router.put("/", ordersRouter.addOrder);

module.exports = router;
