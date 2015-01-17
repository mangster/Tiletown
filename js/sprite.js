var cityTiles_066 = new Sprite("cityTiles_066");
var cityTiles_073 = new Sprite("cityTiles_073");
var cityTiles_059 = new Sprite("cityTiles_059");
var cityTiles_064 = new Sprite("cityTiles_064");
var cityTiles_067 = new Sprite("cityTiles_067");
var cityTiles_097 = new Sprite("cityTiles_097");

//Map Class
function Sprite(name){
	this.name = name;
	this.image = new Image();
	this.image.src = "./img/" + name + ".png";
}
