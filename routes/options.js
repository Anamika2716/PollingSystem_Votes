var express = require('express');
var router = express.Router();
const optionController=require("../controllers/options_controller");
router.post("/:id/add_vote", optionController.addvote);
router.delete("/:id/delete", optionController.deleteOption);
module.exports = router;
