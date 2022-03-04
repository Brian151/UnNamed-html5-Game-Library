package kittengine.core.service.graphics;

// as per https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/display/GraphicsStroke.html
typedef TGraphicsStroke = {
	thickness : Int,
	fill : Int, // gotta do some things...
	// pixelHinting : Bool, // might omit
	miterLimit : Float,
	// could probably use enumerator, instead
	joints : String,
	scaleMode : String,
	caps : String,
}