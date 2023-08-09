

const express = require("express");
const { Generic } = require("../controllers/generic");
const router = express.Router();

router.post("/test" , Generic);


module.exports = router;