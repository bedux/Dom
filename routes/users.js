var express = require('express');
var router = express.Router();

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('request').defaults({ encoding: null});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

io.on('connection', function(socket){
  console.log('a user connected');
});



http.listen(3001,function () {
  console.log("Web socket are listen on 3001");
})


function getImage() {
  request.get("http://192.168.0.102:3001/image/jpeg.cgi", function (err, res, body) {
    io.emit('newImage', new Buffer(body).toString('base64'));
    getImage();

  });
}

getImage();


module.exports = router;
