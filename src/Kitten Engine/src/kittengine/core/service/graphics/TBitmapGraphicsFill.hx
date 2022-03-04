package kittengine.core.service.graphics;
import js.html.Image;

//as per https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/display/GraphicsBitmapFill.html
typedef TGraphicsBitmapFill = {
	bitmapData : Image , // for now...
	matrix : Int, // gotta implement >.<
	repeat : Bool,
	smooth : Bool
}