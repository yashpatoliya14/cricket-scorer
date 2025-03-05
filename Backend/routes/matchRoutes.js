const express = require("express");
const { createMatch } = require("../controllers/Match/createMatch");
const { updateMatchState1, updateMatchState2, startSecondInnings } = require("../controllers/Match/updateMatch");

const router = express.Router();


router.post("/createMatch",createMatch);
router.post("/runs",updateMatchState1);
router.post("/wicket",updateMatchState2);
router.post("/startSecondInnings",startSecondInnings);

module.exports = router;