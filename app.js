var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var exec = require('child_process').exec, child;
var port = process.env.PORT || 3000;
var gpio = require("pi-gpio");
var create = require("create2");
var robot, turnRobot, stopTurn;



app.get('/', function(req, res){
  res.sendfile('Touch.html');
  console.log('HTML sent to client');
});

function start() {
    create.prompt(function(p){create.open(p,main)});
}

function main(r) {
    
    robot = r;

    //Enter Full Mode:
    robot.full(); var run = 1;
    
    
}

//Whenever someone connects this gets executed
io.on('connection', function(socket){
  console.log('A user connected');
  start();
    
  socket.on('pos', function (msx, msy) {
    //console.log('X:' + msx + ' Y: ' + msy);
    //io.emit('posBack', msx, msy);
    
    msx = Math.min(Math.max(parseInt(msx), -255), 255);
    msy = Math.min(Math.max(parseInt(msy), -255), 255);

      // robot.full(); var run = 1;

      // data output
      console.log(msx,msy);

/* Data to roomba
      
      if(msx != 0){
	console.log("msx:" + msx + "msy:" +msy)
	robot.driveSpeed(msx,msy);
      }
      else{
	  console.log("msx:" + msx + "msy:" +msy)
	  robot.driveSpeed(0,0);
      }

*/

  });
  
  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    console.log('A user disconnected');
  });

  setInterval(function(){ // send temperature every 5 sec
      child = exec("cat /sys/class/thermal/thermal_zone0/temp", function(error, stdout, stderr){
      if(error !== null){
         console.log('exec error: ' + error);
      } else {
         var temp = parseFloat(stdout)/1000;
         io.emit('temp', temp);
          console.log('temp', temp);
      }
   });}, 5000);

});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
