/*
	Static class for generating objects containing vector geometry.
	Originally the plan was to implement these prefabs as part of the main vector engine class.
	However, I determined it was a far better idea to export re-use-able, and potentially editiable
	data, instead. Then I just need the vector engine to parse this, which shouldn't be *too* difficult.
	
	NOTES: All angle measurements here are expressed as degrees
	Do NOT use Radians, this conversion is done internally.
	
	This format is actually part of a MUCH larger system I am working on.
	It would be wise not to edit/remove the normalized,exportWidth,exportHeight,and lockDims properties.
	It could cause problems using this format as intended with the system I actually designed it 
	for. The true potential here is much more than drawing/storing vector graphics! //teaser
	Despite the other key part of this system not actually being even in a test-able state yet,
	I have opted to implement this format already because it makes cross-compatibility between
	this 'secret API' and the other vector graphics classes I'm working on considerably easier.
*/
var VectorPrefabGenerator = new function() {}();
/*create a circle using CanvasContext2D.arc();
might update to quadratic curves later...
	PARS:
		x : Number
		y : Number
		radius : Number
		colorFill : Vec4, Unit8Array(4) , Array(4) //basically, any array-type variable with a length of four
		colorStroke : Vec4, Unit8Array(4) , Array(4), etc...
*/
VectorPrefabGenerator.circle = function(x,y,radius,colorFill,colorStroke,lineWidth) {
	var c1 = (colorStroke || [255,255,255,255]);
	var c2 = (colorFill || [0,0,0,0]);
	var l lineWidth || 1;
	return {
		normalized: false, //these 4 will be used later...
		exportWidth : 0,
		exportHeight : 0,
		lockDims : true,
		vertices : [[x,y]],
		colors : [c1,c2],
		shapes : [
		{
			fills : [
				style : {
					color : 0,
					pattern : null,
					grad: null,
				},
				path : [
					{
						action : "arc",
						point : 0,
						rad : radius,
						angle1 : 0,
						angle2 : MathUtils.radians(360),
						ccw : false
					}
				]
			],
			strokes: [
				style : {
					color : 1,
					lineWidth : lineWidth
				},
				path : [
					{
						action : "arc",
						point : 0,
						rad : radius,
						angle1 : 0,
						angle2 : MathUtils.radians(360),
						ccw : false
					}
				]
			]
		}
		]
	};
}
/*create a regular N-GON
	PARS:
		x: Number
		y: Number
		radius: Number //might use apothem/'inner radius' later...
		colorFill : Vec4, Unit8Array(4) , Array(4) //basically, any array-type variable with a length of four
		colorStroke : Vec4, Unit8Array(4) , Array(4), etc...
*/


