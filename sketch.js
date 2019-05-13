function getFormVariables() {
    const data = window.location.search.substring(1, window.location.search.length).split('&').map(v => v.split('='));
    
    return {
        candles: parseInt(data[0][1]),
        years: parseInt(data[1][1]),
        wishMade: data[2][1].length,
    }
}

var userData = getFormVariables();

var total;
var margins = 20; //how to make adaptable?
var circles = [];
var numOfCandles = userData.candles; //change to user input
var startTime;
var finishTime;
var timing = true;
var age = userData.years; //change to user input
var characters = userData.wishMade; //change to characters in wish
var numOfCircles = 8;

var completedShape = false;
var originPoints = [];
var amountOfPoints;

var segments;
var d;

function setup() {
	createCanvas(400, 400); //displayWidth or windowWidth?
	startTime = millis ();
    /*
	button = createButton ('Submit');
	button.mousePressed (stopTime);
    */
  
  segments = constrain(round(age / 6), 2, 100);
  
  // multiple of 4
  numOfCandles = round(characters / 20) * 4;

}

function getPointOnCircle(_angle, _radius) {
	var _angle = radians(_angle);
	var x = cos(_angle) * _radius;
	var y = sin(_angle) * _radius;

	return { x, y };
}

/*
function stopTime () {
  if (timing) {
	finishTime = millis ();
	var numbers = (finishTime - startTime) / 1000;
	var total = round (numbers);
		print ("total is " + total);
    numOfCircles = total;
    timing = false;
  }
}
*/

function draw() {
  
  if (!completedShape) {
    
       drawShape(originPoints, numOfCandles); 
 
      completedShape = true;
 
     for (var j = 1; j < segments; j++) {
     push(); 
      rotate(TWO_PI * j /  segments);
       
       drawShape(originPoints, numOfCandles, true); 
     pop(); 
     
	}
   }
      //NOT WORKING!
      else if (!completedShape && numOfCandles > originPoints) {
        drawShape(originPoints, originPoints); 
 
      completedShape = true;
 
     for (var j = 1; j < segments; j++) {
     push(); 
      rotate(TWO_PI * j /  segments);
       
       drawShape(originPoints, originPoints, true); 
     pop(); 
    }
    }
   
}
    }
}
