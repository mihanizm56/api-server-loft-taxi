const express = require("express");
const credentialsCtrl = require("../controllers/credentials/credentials");
const tokenVefirifyMiddleware = require("../middlewares/auth-tokens/auth-tokens");

const router = express.Router();

// credentials router
router.patch("/", tokenVefirifyMiddleware, credentialsCtrl.updCreds);
router.post("/", tokenVefirifyMiddleware, credentialsCtrl.getStatusOfCreds);
// router.patch("/", tokenVefirifyMiddleware, credentialsCtrl.updCreds);
// router.put("/", tokenVefirifyMiddleware, credentialsCtrl.addCreds);

module.exports = router;
