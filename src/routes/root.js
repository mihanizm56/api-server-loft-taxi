const express = require("express");
const credentialsRouter = require("./credentials");
const ordersRouter = require("./orders");

const router = express.Router();

router.use("/credentials", credentialsRouter);
router.use("/orders", ordersRouter);

module.exports = router;
