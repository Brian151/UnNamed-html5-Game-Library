package kittengine.core.service.graphics;

// based on flash.display.GraphicsPathCommand
// https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/display/GraphicsPathCommand.html
enum EGraphicsCMDID {
	// #ID, data[]
	NOP; // 0 , -0
	MOVE_TO; // 1 , -2
	LINE_TO; // 2 , -2
	CURVE_TO; // 3 , - 4
	// probaby will not use "wide" outside of editors
	WIDE_MOVE_TO; // 4 , -4
	WIDE_LINE_TO; // 5 , -4
	CUBIC_CURVE_TO; // 6 , -6
	PATH_START; // 7 , -0
	DRAW_IMAGE; // 8 , -2
	DRAW_CLIPPED_IMAGE; // 9 , -8
	FILL; // 10 , -0
}