package kittengine.core.service.graphics;

// may not do it this way, but needed to ID the graphics data entries
// rather not create classes/interfaces for this
enum EGraphicsRecord {
	SOLIDFILL;
	BITMAPFILL;
	GRADIENTFILL;
	STROKE;
	PATH;
	ENDFILL;
}