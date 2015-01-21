function Tile (type, zPos, xPos, yPos, width, height){  
    this.width = width;
    this.height = height;
    //this.volume = this.width * this.width * this.height
    //this.screenHeight = worldDistanceToScreenDistance(this.height);

    var cellPoints = getSquareCornersWorld(xPos, yPos, this.width);   
    this.hitBox = new SAT.Polygon(new SAT.Vector(cellPoints.center.x, cellPoints.center.y), [
      new SAT.Vector(cellPoints.point1.x, cellPoints.point1.y),
      new SAT.Vector(cellPoints.point2.x, cellPoints.point2.y),
      new SAT.Vector(cellPoints.point3.x, cellPoints.point3.y),
      new SAT.Vector(cellPoints.point4.x, cellPoints.point4.y)
    ]);
    this.zPos = zPos;
    //this.z = (this.hitBox.pos.x + this.hitBox.points[0].x) + (this.hitBox.pos.y + this.hitBox.points[3].y);
	//this.z = this.hitBox.pos.x + this.hitBox.pos.y;
	this.z = (this.hitBox.pos.x + this.hitBox.points[3].x) + (this.hitBox.pos.y + this.hitBox.points[3].y) + 1000*this.zPos;
	this.sprite = window[type];
	this.fillColor = "rgba(200, 200, 200, 1)";
     this.strokeColor = "rgba(100, 100, 100, 1)";
     this.leftColor = "rgba(175, 175, 175, 1)";
     this.rightColor = "rgba(150, 150, 150, 1)";

    this.getScreenPos = function(){
        var worldPos = {};
        worldPos["x"] = this.hitBox.pos.x;
        worldPos["y"] = this.hitBox.pos.y;
        return worldToScreen(worldPos);
    }

	this.move = function (){
		//just a placeholder
		//this.z = this.hitBox.pos.x + this.hitBox.pos.y;
		this.z = (this.hitBox.pos.x + this.hitBox.points[3].x) + (this.hitBox.pos.y + this.hitBox.points[3].y) + 1000*this.zPos;
		//this.z = (this.hitBox.pos.x) + (this.hitBox.pos.y - this.hitBox.points[3].y);
		
		
	}
    // Draw the tile
    this.draw = function (){
        if (isometric){
            //drawcube
			
			heightOffset = this.sprite.image.height - 101 + this.zPos;
			var imagePos = this.getScreenSquare(this, heightOffset);
			ctx.drawImage(this.sprite.image, 0, 0, this.sprite.image.width, this.sprite.image.height, (imagePos.hitBox.pos.x + imagePos.hitBox.points[0].x - camera.x), ((imagePos.hitBox.pos.y + imagePos.hitBox.points[3].y - camera.y)), this.sprite.image.width, this.sprite.image.height);
		   
		   
		   /*
		   var bottom = this.getScreenSquare(this, -this.screenHeight);
           var top = this.getScreenSquare(this, 0);
           this.drawSquare(top, this.fillColor, this.strokeColor);
		   // Temporary solution for left and right sides
            // Left
            ctx.beginPath();
            ctx.strokeStyle = this.strokeColor;
            ctx.fillStyle = this.leftColor;

            ctx.moveTo(bottom.hitBox.pos.x + bottom.hitBox.points[0].x - camera.x, bottom.hitBox.pos.y + bottom.hitBox.points[0].y - camera.y);
            ctx.lineTo(top.hitBox.pos.x + top.hitBox.points[0].x - camera.x, top.hitBox.pos.y + top.hitBox.points[0].y - camera.y);
            ctx.lineTo(top.hitBox.pos.x + top.hitBox.points[1].x - camera.x, top.hitBox.pos.y + top.hitBox.points[1].y - camera.y);
            ctx.lineTo(bottom.hitBox.pos.x + bottom.hitBox.points[1].x - camera.x, bottom.hitBox.pos.y + bottom.hitBox.points[1].y - camera.y);
            ctx.lineTo(bottom.hitBox.pos.x + bottom.hitBox.points[0].x - camera.x, bottom.hitBox.pos.y + bottom.hitBox.points[0].y - camera.y);

            ctx.stroke();
            ctx.fill();
            ctx.closePath();
            
            // Right
            ctx.beginPath();
            ctx.strokeStyle = this.strokeColor;
            ctx.fillStyle = this.rightColor;

            ctx.moveTo(bottom.hitBox.pos.x + bottom.hitBox.points[1].x - camera.x, bottom.hitBox.pos.y + bottom.hitBox.points[1].y - camera.y);
            ctx.lineTo(top.hitBox.pos.x + top.hitBox.points[1].x - camera.x, top.hitBox.pos.y + top.hitBox.points[1].y - camera.y);
            ctx.lineTo(top.hitBox.pos.x + top.hitBox.points[2].x - camera.x, top.hitBox.pos.y + top.hitBox.points[2].y - camera.y);
            ctx.lineTo(bottom.hitBox.pos.x + bottom.hitBox.points[2].x - camera.x, bottom.hitBox.pos.y + bottom.hitBox.points[2].y - camera.y);
            ctx.lineTo(bottom.hitBox.pos.x + bottom.hitBox.points[1].x - camera.x, bottom.hitBox.pos.y + bottom.hitBox.points[1].y - camera.y);

            ctx.stroke();
            ctx.fill();
            ctx.closePath();*/
			
			
        }
        else{
            this.drawSquare(this, this.fillColor, this.strokeColor);
        }
    }
    // Draw square
    this.drawSquare = function (object, fill, stroke){
        ctx.beginPath();
        ctx.strokeStyle = stroke;
        ctx.fillStyle = fill;
		//point 1 is south
		//point 2 is east
        ctx.moveTo(object.hitBox.pos.x + object.hitBox.points[0].x - camera.x, object.hitBox.pos.y + object.hitBox.points[0].y - camera.y);   
        ctx.lineTo(object.hitBox.pos.x + object.hitBox.points[1].x - camera.x, object.hitBox.pos.y + object.hitBox.points[1].y - camera.y);   
        ctx.lineTo(object.hitBox.pos.x + object.hitBox.points[2].x - camera.x, object.hitBox.pos.y + object.hitBox.points[2].y - camera.y);   
        ctx.lineTo(object.hitBox.pos.x + object.hitBox.points[3].x - camera.x, object.hitBox.pos.y + object.hitBox.points[3].y - camera.y);
        ctx.lineTo(object.hitBox.pos.x + object.hitBox.points[0].x - camera.x, object.hitBox.pos.y + object.hitBox.points[0].y - camera.y);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
		
		//ctx.drawImage(grass, 0, 0, 100, 65, (object.hitBox.pos.x + object.hitBox.points[0].x - camera.x), ((object.hitBox.pos.y + object.hitBox.points[0].y - camera.y)), 100, 65);
    }

    this.getScreenSquare = function (object, heightOffset){
        //TODO move to update-function

        var square = {};
        square.hitBox = {};
        square.hitBox.pos = worldToScreen(object.hitBox.pos);
 
        square.hitBox.pos.y -= heightOffset;
        square.hitBox.points = [];
        for (var i = 0; i < object.hitBox.points.length; i++){
            square.hitBox.points[i] = worldToScreen(object.hitBox.points[i]);
        }
        return square;
    }
}