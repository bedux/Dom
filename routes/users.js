var express = require('express');
var router = express.Router();

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('request').defaults({ encoding: null});


var cameras = [
  {
  name:"WebCam1",
  localAddress:"http://192.168.0.102:3001/image/jpeg.cgi"
},
  {
    name:"WebCam2",
    localAddress:"http://192.168.1.6/image/jpeg.cgi"
  },
]

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(cameras);
});

io.on('connection', function(socket){
  console.log('a user connected');
});



http.listen(3001,function () {
  console.log("Web socket are listen on 3001");
})


function getImage() {
  for(var i in cameras ){
    request.get(cameras[i].localAddress,
        clos(cameras[i])
    );
  }
}

function clos(info){

  return function (err, res, body) {
    try {
      io.emit("NewImage", {Name: info.name, Data: new Buffer(body).toString('base64')});
    }catch(e) {

    }
    finally {

    }
  }
}
setInterval(getImage,300);


module.exports = router;
