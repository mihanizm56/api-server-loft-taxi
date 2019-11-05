const express = require("express");
const ordersRouter = require("../controllers/orders/orders");
const tokenVefirifyMiddleware = require("../middlewares/auth-tokens/auth-tokens");

const router = express.Router();

router.put("/", tokenVefirifyMiddleware, ordersRouter.addOrder);
router.post("/", tokenVefirifyMiddleware, ordersRouter.doneOrder);
router.get("/", tokenVefirifyMiddleware, ordersRouter.getLastOrder);
router.get(
	"/paginate",
	// tokenVefirifyMiddleware,
	ordersRouter.getPaginatedOrders
);
// router.get("/order/:id", tokenVefirifyMiddleware, ordersRouter.getLastOrder); // todo make find order by id

module.exports = router;
