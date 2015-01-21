// Get the canvas element
var canvas = document.getElementById( "canvas" );
// Get our 2D context for drawing
var ctx = canvas.getContext( "2d" );

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;


var mapWidth = 800;
var mapHeight = 600;

var tileSize = 66;

var map = new Map();
map.createPlayer();

//Skapa random karta, graph skapas (kan användas för astar senare)
var grid = generateRandom(mapWidth/tileSize, mapHeight/tileSize, 0.1);

for (var i = 0; i < grid.nodes.length; i++){
	row = [];
	for (var j = 0; j < grid.nodes[i].length; j++){
		var tile = grid.nodes[i][j];
		map.createTile(tile.type, tile.x * tileSize, tile.y * tileSize);
	}
}
map.entities[23].zPos = 40;
//console.log(map.entities[1].z);

//Map Class
function Map(){
    this.tileSize = tileSize;
    //this.tiles = [];
	this.entities = [];
    this.createTile = function(type, xPos, yPos){
		//create tile 
		if (yPos > 300 && yPos < 350){
			if (type > 0){
				var tile = new Tile("cityTiles_073", 0, xPos, yPos, this.tileSize, this.tileSize/3);
			}
			else{
				var tile = new Tile("cityTiles_064", 0, xPos, yPos, this.tileSize, this.tileSize/3);
			}
		}
		else{
			if (type > 0){
				//var tile = new Tile("cityTiles_097", xPos, yPos, this.tileSize, this.tileSize/3);
				var tile = new Tile("cityTiles_066", 0, xPos, yPos, this.tileSize, this.tileSize/3);
			}
			else{
				var tile = new Tile("cityTiles_067", 0, xPos, yPos, this.tileSize, this.tileSize/3);
			}	
		}		
		this.entities.push(tile);
	}
	this.createPlayer = function(){
        var xPos = 0;
        var yPos = 0;
        var size = 30000;
        var direction = 90;
        var speed = 5;
        var heightScale = 1.5;
        var width = Math.pow((size / heightScale), 1/3);
        var height = width * heightScale;
        var jumpHeight = height/2;
        var jumpSpeed = 0.2;
        this.player = new Entity("player", xPos, yPos, size, direction, speed, heightScale, jumpHeight, jumpSpeed);

        this.entities.push(this.player);
    }
    this.update = function(){
        //sort by depth
		this.entities.sort(compareZ);
		//this.entities.sort(compareZpos);
        //move all entities
        for ( var i = 0; i < this.entities.length; i++ ) {
            var p = this.entities[i];
            p.move();
        }
    }

    this.draw = function(){
        //draw all tiles
        for ( var i = 0; i < this.entities.length; i++ ) {
            var p = this.entities[i];
            p.draw();
        }
    }
}



/*

}

function drawMap(){
    //TODO flytta ut?
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	
	//TODO lägg till en koll om blocket syns på canvasen, rita inte ut om ej
	if (isometric){
		for (var i = 0; i < map.length; i++){
			for (var j = map[i].length -1; j >= 0; j--){i
				var tile = map[i][j];
				drawScreenTile(tile);
			}
		}
	}
	else{
		for (var i = 0; i < map.length; i++){
			for (var j = 0; j < map[i].length; j++){
				var tile = map[i][j];
				drawWorldTile(tile);
			}
		}
	}
}
*/