var create = require('create2');
var robot, turnRobot, stopTurn;

function start() {
    create.prompt(function(p){create.open(p,main)});
}

//Main Program:
function main(r) {
    robot = r; handleInput(robot);
    
    //Enter Full Mode:
    robot.full(); var run = 1;


//    console.log(robot.data.proxFrontLeft);

    //    robot.stop();


    function handleInput(robot) {

	robot.setSong(2, [[99,16],[106,16],[100,16],[82,16]]);
	
	//Process user input, quit on 'exit'
	const rl = require('readline').createInterface
	({input:process.stdin, output:process.stdout});
	rl.on('line', function(text) {
	    if(text == "exit" || text == "quit") {
		console.log("Exiting..."); process.exit();
	    } else if(text == "t") {
		console.log("Slow Song");
		robot.setSong(1, [[47,64],[48,64],[47,64],[48,64],[47,32],[48,32],[47,32],[48,32],[47,32],[48,32],[47,32],[48,32]]);
		robot.play(1);
		
	    } else if(text == "y") {
		console.log("fast Song");
		robot.play(2);
	    } else if(text == "a") {
		console.log("left");
		robot.driveSpeed(-125,125); 
		
	    } else if(text == "d") {
		console.log("right");
                robot.driveSpeed(125,-125);
		
	    } else if(text == "s") {
		console.log("stop");
		robot.driveSpeed(0,0);
		
	    } else if(text == "w") {
		console.log("forward");
		robot.driveSpeed(500,500);
	    } else if(text == "x") {
		console.log("backward");
		robot.driveSpeed(-500,-500);
	    } else if(text == "dock") {
		console.log("docking");
		robot.autoDock();
	    } else if(text == "start") {
		console.log("starting");
		robot.start();
	    } else if(text == "undock") {
		console.log("undocking");
		robot.full(); var run = 1;
	    } else if(text == "led") {
		console.log("setting leds");
		robot.setLeds(robot.spotLed);
            } else if(text == "sens") {
		

		console.log("sensorReading");
		var sensor = robot.data.bumpRight;
		if (sensor == true){
		    console.log("bumpright:" + sensor);
		    robot.play(2);}
		else {
		    console.log("bumpright:" + sensor);
		
		}
            } else if(text == "ir") {
		console.log("ir sensor");
		var ir = robot.data.irRight;
		console.log("ir right side: " + ir);
	    }    else if(text == "text") {
		console.log("Setting text");
		robot.showText("Blip BLoop", 500);
	    }  else if(text == "drop") {
		console.log("drop sensor test");
		console.log(robot.data.dropLeft);
	    }   else if(text == "air") {
		console.log("air Q");
		console.log(robot.data.airQuality);
	    }  else if(text == "proxl") {
		console.log("Prox front left");
		console.log(robot.data.proxFrontLeft);
	    }
	    
	    

	    
	    console.log();
	    
	    
	    
	    
	    
	    
	    

	    
	});
    }
    

    
}


start();
