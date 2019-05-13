
/*
 * Gets data from query string and parses it properly
 */
function getFormVariables() {
    var data = window.location.search.substring(1, window.location.search.length).split('&').map(v => v.split('='));
    
    return {
        candles: parseInt(data[0][1]),
        years: parseInt(data[1][1]),
        wishMade: data[2][1].length,
        time: parseInt(data[3][1])
    }
}

var userData = getFormVariables();

// Array to store all of the concentric circles
var circles = [];

// User data section
var numOfCandles = userData.candles;
var age = userData.years;
var characters = userData.wishMade;
var numOfCircles = userData.time;

// Array of points generated in a segment
var originPoints = [];

/*
 * Function to return a point on a circle, given
 * angle and radius
 */
function getPointOnCircle(_angle, _radius) {
	var _angle = radians(_angle);
	var x = cos(_angle) * _radius;
	var y = sin(_angle) * _radius;

	return { x, y };
}


//Create object class for circles
class Circle {
	constructor(_x, _y, d) {
		this.x = _x;
		this.y = _y;
		this.d = d;
	}

	show() {
		stroke(204);
        strokeWeight(1);
		noFill();
		ellipse(this.x, this.y, this.d);
	}
}




// Variable to work out how many segments to divide circle into
var segments;

// Variable to work out subidivided segments in segment
var amountOfPoints;

// Randomly shuffled array of generated points
var randomShuffled;

function setup() {
    var canvas = createCanvas(400, 400);
 
    // Move the canvas so it’s inside our <div id="sketch-holder">.
    canvas.parent('Token');
    
    segments = constrain(round(age / 6), 2, 100);
  
    // multiple of 4
    amountOfPoints = round(characters / 2);
    console.log("amountOfPoints", amountOfPoints);
    
    noLoop();
}


function draw() {
    
    generatePoints();
    
    drawShape(originPoints, amountOfPoints);
    
    for (var j = 1; j < segments; j++) {
        push();
        rotate(TWO_PI * j /  segments);
       
        drawShape(originPoints, amountOfPoints, true);
        
        pop();
        
	}
    
    var saveButton = select("#Save");
        saveButton.mousePressed (saveImg);
}

function saveImg () {
    save('My Wish');
}

function generatePoints() {
    var diameter = width / numOfCircles;
    translate(width / 2, height / 2);
  
	// Work out the number of circles
    for (var ii = 0; ii <= numOfCircles; ii++) {
        var d = diameter * ii;
        
        circles[ii] = new Circle(0, 0, d);
        circles[ii].show();
			
        // Work out the angle of each 'segment'
        var segmentSize = (360 / segments) / numOfCandles;

        //Create points from No of candles
        for (var i = 0; i < numOfCandles; i++) {
            var _point = getPointOnCircle(segmentSize * i, d / 2);
            
            originPoints.push(_point);
          
        for (var j = 0; j < segments; j++) {
        push();
        rotate(TWO_PI * j /  segments);
       
        ellipse (_point.x, _point.y, 5);
        
        pop();
        }
        }
    }
}

function drawShape(points, amount, useOld = false) {
    if (!useOld) {
      randomShuffled = shuffle(points);
    }

    noFill();
    strokeWeight(2);
  
    stroke(random(10, 255), random(10, 255), random(10, 255));
    beginShape();
    for (var i = 0; i < amount; i +=4) {
        vertex(randomShuffled[i].x, randomShuffled[i].y);
        bezierVertex(
            randomShuffled[i + 1].x, randomShuffled[i + 1].y,
            randomShuffled[i + 2].x, randomShuffled[i + 2].y,
            randomShuffled[i + 3].x, randomShuffled[i + 3].y,
        );
    }
    endShape(CLOSE);  
}
