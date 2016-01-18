var express = require('express');
var router = express.Router();
var mathToImage = require('html2canvas');

router.get('/convertToCanvas', function(req, res) {
	mathToImage(req.query.content, {
		onrendered: function(canvas) {
			res.send(canvas);
		}
	});
});

module.exports = router;