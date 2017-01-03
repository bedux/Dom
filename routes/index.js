var express = require('express');
var router = express.Router();
var gpio = require("pi-gpio");

/* GET home page. */

router.get('/', function(req, res, next) {
 
	
  res.render('index', { title: 'Express' });
});


router.get('/On', function(req, res, next) {
	gpio.open(req.query.id, "output", function(err) {		// Open pin 16 for output 
	    gpio.write(req.query.id, 1, function() {			// Set pin 16 high (1) 
	        gpio.close(req.query.id);						// Close pin 16 
	    });
	});

  res.render('index', { title: 'Express' });
});
router.get('/Off/:id', function(req, res, next) {
 
	gpio.open(req.query.id, "output", function(err) {		// Open pin 16 for output 
	    gpio.write(req.query.id, 0, function() {			// Set pin 16 high (1) 
	        gpio.close(req.query.id);						// Close pin 16 
	    });
	});

  res.render('index', { title: 'Express' });
});

module.exports = router;
