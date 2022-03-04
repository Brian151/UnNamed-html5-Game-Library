package kittengine.core.service.graphics;

// as per https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/display/GraphicsPath.html
// omitted winding [for now] cuz screw that garbage!
typedef TGRaphicsPath = {
	commands : Array<Int>,
	data : Array<Int>
}