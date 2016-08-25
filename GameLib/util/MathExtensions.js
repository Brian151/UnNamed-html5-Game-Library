//not by me... and really just common gamedev knowledge, anyways
function getRadians(degrees) {
	return degrees * Math.PI / 180;
}
function getDegrees(radians) {
	return radians * 180 / Math.PI;
}
function getCartFromPolar(r,a) {
	var x = r * Math.cos(a);
	var y = r * Math.sin(a);
	return {x:x,y:y};
}