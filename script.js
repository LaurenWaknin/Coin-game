
let floorPos_y;

let clouds;
let mountains;
let trees_x;

function setup()
{
	createCanvas(1024, 576);
    floorPos_y = height * 3/4;

    startGame();
}

function draw(){
    // Draws blue sky
	background(100, 155, 255); 

    // Draws green ground
	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height/4); 

	// Draws clouds
    drawClouds();
	// Draws mountains
    drawMountains();
	// Draws trees
    drawTrees();
}

function startGame(){


		// Initialise arrays of scenery objects
		//need to make canvas move on screen 
    trees_x = [150, 500, 900, 1100, 1500, 1700, 2000, 2800];
    
    clouds =  [{x_pos: 100,y_pos: 100,size: 30},
              {x_pos: 500,y_pos: 70,size: 100},
              {x_pos: 800,y_pos: 100,size: 30},
              {x_pos: 1100,y_pos: 80,size: 50},
              {x_pos: 1450,y_pos: 90,size: 40},
              {x_pos: 2100,y_pos: 90,size: 40}];
    
    mountains=[{x_pos: 100,y_pos: 0},
              {x_pos: 400,y_pos: 0},
              {x_pos: 700,y_pos: 0},
              {x_pos: 1700,y_pos: 0}];
    
    canyons = [{x_pos: 220,width: 160},
              {x_pos: 550,width: 160},
              {x_pos: 1250,width: 160}]; 
}

// ---------------------------
// Background 
// ---------------------------

// Function to draw cloud objects
function drawClouds()
{
    for( let i = 0; i < clouds.length; i++)
    {
        noStroke();
        fill(255);
        ellipse(clouds[i].x_pos+60,clouds[i].y_pos+50,clouds[i].size+10,clouds[i].size);
        ellipse(clouds[i].x_pos+80,clouds[i].y_pos+50,clouds[i].size+30,clouds[i].size+30);
        ellipse(clouds[i].x_pos+120,clouds[i].y_pos+50,clouds[i].size+70,clouds[i].size+50);
        ellipse(clouds[i].x_pos+150,clouds[i].y_pos+50,clouds[i].size+60,clouds[i].size+20);
    }    
}

// Function to draw mountains objects
function drawMountains()
{
    for( let i = 0; i < mountains.length; i++) 
    {
        noStroke();
        fill(120,120,120,240);
        triangle(mountains[i].x_pos+350,mountains[i].y_pos+150,mountains[i].x_pos+300,mountains[i].y_pos+432,mountains[i].x_pos+375,mountains[i].y_pos+432);
        fill(120,120,120,240);
        strokeWeight(5);
        stroke(120,120,120);
        triangle(mountains[i].x_pos+400,mountains[i].y_pos+100,mountains[i].x_pos+350,mountains[i].y_pos+432,mountains[i].x_pos+450,mountains[i].y_pos+432);
    }
}

// Function to draw trees objects
function drawTrees()
{
    for( let i =0; i < trees_x.length; i++)
    {
        console.log(trees_x[i]);
        noStroke();
        fill(121,68,7);
        rect(trees_x[i]+20,floorPos_y-125,30,132);
        fill(34,88,7);
        ellipse(trees_x[i]+11,floorPos_y-90,80,70);
        ellipse(trees_x[i]+36,floorPos_y-150,80,70);
        ellipse(trees_x[i]+61,floorPos_y-90,80,70);
    }    
}


