package kittengine.core.service.graphics;

//as per https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/display/GraphicsGradientFill.html
typedef TGraphicsGradientFill = {
	colors : Array<Int>,
	alphas : Array<Int>,
	ratios : Array<Int>,
	matrix : Int, // again, gotta implement this
	focalPointRatio : Float,
	// could probably use enumerator, instead
	interPolationMethod : String,
	spreadMethod : String,
	type : String
}