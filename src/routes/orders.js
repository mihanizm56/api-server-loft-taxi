const express = require("express");
const ordersRouter = require("../controllers/orders/orders");
const tokenVefirifyMiddleware = require("../middlewares/auth-tokens/auth-tokens");

const router = express.Router();

router.put("/", tokenVefirifyMiddleware, ordersRouter.addOrder);
router.post("/", tokenVefirifyMiddleware, ordersRouter.doneOrder);
router.get("/", tokenVefirifyMiddleware, ordersRouter.getLastOrder);

module.exports = router;
