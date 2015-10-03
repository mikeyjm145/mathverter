var express = require('express');
var router = express.Router();
var mathvert = require('mathxml');

/* GET home page. */
router.get('/convertFromRegMathToMathML', function(req, res) {
	var conversionResult;
	
	if (req.query.supported === "supported") {
		conversionResult = mathvert(0, req.query.content);
	} else {
		conversionResult = mathvert(1, req.query.content);
	}
	
	res.send(conversionResult);
});

module.exports = router;