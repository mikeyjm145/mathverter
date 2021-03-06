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
	
    console.log("Reg Math to MathML: " + conversionResult);
    
	res.send(conversionResult);
});

router.get('/convertFromMathMLToRegMath', function(req, res) {
	var conversionResult;

	conversionResult = mathvert(2, req.query.content);
    
	console.log("MathML to Reg Math: " + conversionResult);
	
	res.send(conversionResult);
});

router.get('/convertFromJavaToMathML', function(req, res) {
	var conversionResult;
    
    if (req.query.supported === "supported") {
		conversionResult = mathvert(3, req.query.content);
	} else {
		conversionResult = mathvert(4, req.query.content);
	}
    
	console.log("Java to MathML: " + conversionResult);
	
	res.send(conversionResult);
});

router.get('/convertFromMathMLToJava', function(req, res) {
	var conversionResult = mathvert(5, req.query.content);
    
	console.log("MathML to Java: " + conversionResult);
	
	res.send(conversionResult);
});

router.get('/convertFromJavaToMath', function(req, res) {
	var conversionResult = mathvert(6, req.query.content);
    
	console.log("Java to Math: " + conversionResult);
	
	res.send(conversionResult);
});

router.get('/convertFromMathToJava', function(req, res) {
	var conversionResult = mathvert(7, req.query.content);
    
	console.log("Math to Java: " + conversionResult);
	
	res.send(conversionResult);
});

module.exports = router;