const express = require("express");
const credentialsCtrl = require("../controllers/credentials/credentials");

const router = express.Router();

// credentials router
router.post("/", credentialsCtrl.getCreds);
router.patch("/", credentialsCtrl.updCreds);
router.put("/", credentialsCtrl.addCreds);

module.exports = router;
