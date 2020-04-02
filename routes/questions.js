var express = require('express');
var router = express.Router();
const questionsController=require('../controllers/questions_controller');

console.log("inside router");
router.post("/create", questionsController.postQuestions);
router.post("/:id/options/create", questionsController.addoptions);
router.get("/:id", questionsController.getQuestions);
router.delete("/:id/delete", questionsController.deleteQuestion);
module.exports = router;
