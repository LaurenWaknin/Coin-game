
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


	// Draws canyons
    for( let i = 0; i < canyons.length; i++)
    {
        drawCanyon(canyons[i]);
        //checkCanyon(canyons[i]);
    }

    // Draws game character
	drawGameChar();
    //checkPlayerDie();
    
    fill(255);
    noStroke();
    textSize(20);
    text("Score:" + game_score, 20,20);
    drawHeart();

	// Logic to make the game character move or the background scroll.
	if(isLeft)
	{
		if(gameChar_x > width * 0.2)
		{
			gameChar_x -= 5;
		}
		else
		{
			scrollPos += 5;
		}
	}

	if(isRight)
	{
		if(gameChar_x < width * 0.8)
		{
			gameChar_x  += 5;
		}
		else
		{
			scrollPos -= 5; // negative for moving against the background
		}
	}

	// Logic to make the game character rise and fall.
    if(isLeft == true)
    {
        gameChar_x -=1;       
    }

    if(isRight == true)
    {
        gameChar_x +=1;
    }

    if(gameChar_y < floorPos_y)
    {
        isFalling == true;
        gameChar_y +=2;
    }

    if(isPlummeting == true)
    {
        gameChar_y +=3;
    }
    
    if(flagpole.isReached == false)
    {
        checkFlagpole();
    }

	// Update real position of gameChar for collision detection
	gameChar_world_x = gameChar_x - scrollPos;
}


// ---------------------
// Key control 
// ---------------------

function keyPressed(){

    if(keyCode == 37)
    {
        console.log("left arrow");
        isLeft = true;
    }

    if(keyCode == 39)
    {
        console.log("right arrow");
        isRight = true;
    }

    if(keyCode == 32 && gameChar_y == floorPos_y)
    {
        console.log("space bar");
        gameChar_y -=100;
        jumpSound.play();
    }

}

function keyReleased()
{
    if(keyCode == 37)
    {
        console.log("left arrow");
        isLeft = false;
    }
    if(keyCode == 39)
    {
        console.log("right arrow");
        isRight = false;
    }
}


// ------------------------------
// Game character 
// ------------------------------

// Function that draws the game character
function drawGameChar()
{
	
    if(isLeft && isFalling)
    {
        // Jumping-left character 
        //head
        fill(255,222,173);
        ellipse(gameChar_x-3,gameChar_y-62,22);
        //eyes
        stroke(128,0,0);
        strokeWeight(5);
        point(gameChar_x-8, gameChar_y-66); 
        noStroke();
        strokeWeight(1);
        //nose
        fill(255,222,173);
        triangle(gameChar_x-13,gameChar_y-63,gameChar_x-19,gameChar_y-60, gameChar_x-10,gameChar_y-60);
        //mouth
        fill(250,128,114);
        ellipse(gameChar_x-8,gameChar_y-57,10,3);
        //neck
        fill(255,222,173);
        rect(gameChar_x-5,gameChar_y-53,4,4);
        //torso
        fill(255,0,0);
        rect(gameChar_x-10, gameChar_y-50, 15,20);
        //left arm
        fill(255,222,173);
        beginShape();
        vertex(gameChar_x,gameChar_y-50);
        vertex(gameChar_x,gameChar_y-30);
        vertex(gameChar_x-5,gameChar_y-30);
        vertex(gameChar_x-5,gameChar_y-50);
        endShape();
        //legs
        fill(0,0,255);
        rect(gameChar_x-10, gameChar_y-30, 15, 20);
        //space betweeen legs
        fill(255);
        triangle(gameChar_x-2,gameChar_y-22,gameChar_x-9,gameChar_y,gameChar_x+3,gameChar_y);
        fill(0,0,255);
        beginShape();
        vertex(gameChar_x+5,gameChar_y-10);
        vertex(gameChar_x+5,gameChar_y-15);
        vertex(gameChar_x+15,gameChar_y-25);
        vertex(gameChar_x+15,gameChar_y-20);
        endShape();
        beginShape();
        vertex(gameChar_x-10,gameChar_y-10);
        vertex(gameChar_x-10,gameChar_y-15);
        vertex(gameChar_x+10,gameChar_y-25);
        vertex(gameChar_x+10,gameChar_y-20);
        endShape();
    }
    else if(isRight && isFalling)
    {
        // Jumping-right character 
        //head
        fill(255,222,173);
        ellipse(gameChar_x-3,gameChar_y-62,22);
        //eyes
        stroke(128,0,0);
        strokeWeight(5);
        point(gameChar_x+2, gameChar_y-67); 
        noStroke();
        strokeWeight(1);
        //nose 
        fill(255,222,173);
        triangle(gameChar_x+4,gameChar_y-64,gameChar_x+4,gameChar_y-60, gameChar_x+13,gameChar_y-60);
        //mouth
        fill(250,128,114);
        ellipse(gameChar_x+2,gameChar_y-57,10,3);
        //neck
        fill(255,222,173);
        rect(gameChar_x-5,gameChar_y-53,4,4);
        //torso
        fill(255,0,0);
        rect(gameChar_x-10, gameChar_y-50, 15,20);
        //right arm
        fill(255,222,173);
        beginShape();
        vertex(gameChar_x,gameChar_y-50);
        vertex(gameChar_x,gameChar_y-30);
        vertex(gameChar_x-5,gameChar_y-30);
        vertex(gameChar_x-5,gameChar_y-50);
        endShape();
        //legs
        fill(0,0,255);
        rect(gameChar_x-10, gameChar_y-30, 15, 25);
        //space betweeen legs
        fill(255);
        triangle(gameChar_x-2,gameChar_y-22,gameChar_x-9,gameChar_y,gameChar_x+3,gameChar_y);
        fill(0,0,255);
        beginShape();
        vertex(gameChar_x-10,gameChar_y-5);
        vertex(gameChar_x-10,gameChar_y-15);
        vertex(gameChar_x-15,gameChar_y-25);
        vertex(gameChar_x-15,gameChar_y-20);
        endShape();
        beginShape();
        vertex(gameChar_x+2,gameChar_y-6 );
        vertex(gameChar_x+2,gameChar_y-11);
        vertex(gameChar_x-10,gameChar_y-25);
        vertex(gameChar_x-10,gameChar_y-20);
        endShape();
    }
    else if(isLeft)
    {
        // Walking left character 
        //head
        strokeWeight(5);
        stroke(111,39,8);
        fill(255,222,173);
        ellipse(gameChar_x-3,gameChar_y-62,22);
        //eyes
        stroke(128,0,0);
        strokeWeight(5);
        point(gameChar_x-8, gameChar_y-66); 
        noStroke();
        strokeWeight(1);
        //nose
        fill(255,222,173);
        triangle(gameChar_x-13,gameChar_y-63,gameChar_x-19,gameChar_y-60, gameChar_x-10,gameChar_y-60);
        //mouth
        fill(250,128,114);
        ellipse(gameChar_x-8,gameChar_y-57,10,3);
        //neck
        fill(255,222,173);
        rect(gameChar_x-5,gameChar_y-53,4,4);
        //torso
        fill(255,0,0);
        rect(gameChar_x-10, gameChar_y-50, 15,20);
        //left arm
        fill(255,222,173);
        beginShape();
        vertex(gameChar_x,gameChar_y-50);
        vertex(gameChar_x,gameChar_y-30);
        vertex(gameChar_x-5,gameChar_y-30);
        vertex(gameChar_x-5,gameChar_y-50);
        endShape();
        //legs
        fill(0,0,255);
        rect(gameChar_x-10, gameChar_y-30, 15, 25);
        //space betweeen legs
        fill(100,155,255);
        triangle(gameChar_x-2,gameChar_y-22,gameChar_x-9,gameChar_y,gameChar_x+3,gameChar_y);
    }
    else if(isRight)
    {
        // Walking right character 
        //head
        strokeWeight(5);
        stroke(111,39,8);
        fill(255,222,173);
        ellipse(gameChar_x-3,gameChar_y-62,22);
        //eyes
        stroke(128,0,0);
        strokeWeight(5);
        point(gameChar_x+2, gameChar_y-67); 
        noStroke();
        strokeWeight(1);
        //nose 
        fill(255,222,173);
        triangle(gameChar_x+4,gameChar_y-64,gameChar_x+4,gameChar_y-60, gameChar_x+13,gameChar_y-60);
        //mouth
        fill(250,128,114);
        ellipse(gameChar_x+2,gameChar_y-57,10,3);
        //neck
        fill(255,222,173);
        rect(gameChar_x-5,gameChar_y-53,4,4);
        //torso
        fill(255,0,0);
        rect(gameChar_x-10, gameChar_y-50, 15,20);
        //right arm
        fill(255,222,173);
        beginShape();
        vertex(gameChar_x,gameChar_y-50);
        vertex(gameChar_x,gameChar_y-30);
        vertex(gameChar_x-5,gameChar_y-30);
        vertex(gameChar_x-5,gameChar_y-50);
        endShape();
        //legs
        fill(0,0,255);
        rect(gameChar_x-10, gameChar_y-30, 15, 25);
        //space betweeen legs
        fill(100,155,255);
        triangle(gameChar_x-2,gameChar_y-22,gameChar_x-9,gameChar_y,gameChar_x+3,gameChar_y);
    }
    else if(isFalling || isPlummeting)
    {
        // Jumping facing forwards character 
         //head
        strokeWeight(5);
        stroke(111,39,8);
        fill(255,222,173);
        ellipse(gameChar_x,gameChar_y-63,25);
        //eyes
        stroke(128,0,0);
        strokeWeight(5);
        point(gameChar_x-5, gameChar_y-68);
        point(gameChar_x+5,gameChar_y-68);  
        noStroke();
        strokeWeight(1);
        //nose
        fill(222,184,135);
        triangle(gameChar_x,gameChar_y-65,gameChar_x-3,gameChar_y-62, gameChar_x+3,gameChar_y-62);
        //mouth
        fill(250,128,114);
        ellipse(gameChar_x,gameChar_y-57,10,5);
        //neck
        fill(255,222,173);
        rect(gameChar_x-3,gameChar_y-55,6,6);
        //torso
        fill(255,0,0);
        rect(gameChar_x-10, gameChar_y-50, 20,20);
        //left arm
        fill(255,222,173);
        beginShape();
        vertex(gameChar_x-10, gameChar_y-50);
        vertex(gameChar_x-23, gameChar_y-30);
        vertex(gameChar_x-18, gameChar_y-30);
        vertex(gameChar_x-10, gameChar_y-45);
        endShape();
        //right arm
        fill(255,222,173);
        beginShape();
        vertex(gameChar_x+10,gameChar_y-50);
        vertex(gameChar_x+25,gameChar_y-30);
        vertex(gameChar_x+20,gameChar_y-30);
        vertex(gameChar_x+10,gameChar_y-45);
        endShape();
        //legs
        fill(0,0,255);
        rect(gameChar_x-10, gameChar_y-30, 20, 20);
        beginShape();
        vertex(gameChar_x+10,gameChar_y-10);
        vertex(gameChar_x+10,gameChar_y-15);
        vertex(gameChar_x+20,gameChar_y-25);
        vertex(gameChar_x+20,gameChar_y-20);
        endShape();
        beginShape();
        vertex(gameChar_x-10,gameChar_y-10);
        vertex(gameChar_x-10,gameChar_y-15);
        vertex(gameChar_x-20,gameChar_y-25);
        vertex(gameChar_x-20,gameChar_y-20);
        endShape();
    }
    else
    {
        // Standing front facing charcter 
        // head
        strokeWeight(5);
        stroke(111,39,8);
        fill(255,222,173);
        ellipse(gameChar_x,gameChar_y-63,25);
        //eyes
        stroke(128,0,0);
        strokeWeight(5);
        point(gameChar_x-5, gameChar_y-68);
        point(gameChar_x+5,gameChar_y-68);  
        noStroke();
        strokeWeight(1);
        //nose
        fill(222,184,135);
        triangle(gameChar_x,gameChar_y-65,gameChar_x-3,gameChar_y-62, gameChar_x+3,gameChar_y-62);
        //mouth
        fill(250,128,114);
        ellipse(gameChar_x,gameChar_y-57,10,5);
        //neck
        fill(255,222,173);
        rect(gameChar_x-3,gameChar_y-55,6,6);
        //torso
        fill(255,0,0);
        rect(gameChar_x-10, gameChar_y-50, 20,20);
        //left arm
        fill(255,222,173);
        beginShape();
        vertex(gameChar_x-10, gameChar_y-50);
        vertex(gameChar_x-20, gameChar_y-30);
        vertex(gameChar_x-15, gameChar_y-30);
        vertex(gameChar_x-10, gameChar_y-45);
        endShape();
        //right arm
        fill(255,222,173);
        beginShape();
        vertex(gameChar_x+10,gameChar_y-50);
        vertex(gameChar_x+20,gameChar_y-30);
        vertex(gameChar_x+15,gameChar_y-30);
        vertex(gameChar_x+10,gameChar_y-45);
        endShape();
        //legs
        fill(0,0,255);
        rect(gameChar_x-10, gameChar_y-30, 20, 30);
        //space betweeen legs
        fill(100,155,255);
        triangle(gameChar_x,gameChar_y-27,gameChar_x-5,gameChar_y,gameChar_x+5,gameChar_y);
    }

}

function startGame(){

	gameChar_x = width/2;
	gameChar_y = floorPos_y;


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

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects

function drawCanyon(t_canyon)
{
    noStroke();
    fill(208,171,98);
    rect(t_canyon.x_pos, floorPos_y, t_canyon.width, height - floorPos_y);
    fill(100,155,255);
    ellipse(t_canyon.x_pos+80,floorPos_y,150,100);
}


