package kittengine.objects;

/**
 * ...
 * @author Brian
 */
class GameObjectManager extends GameObject
{
	var children : Array<GameObject>;

	public function new() 
	{
		super();
		children = new Array();
	}
	
}