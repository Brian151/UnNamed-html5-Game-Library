package kittengine.objects.gui.components;
import kittengine.objects.gui.UIBaseComponent;

/**
 * ...
 * @author Brian
 */
class UIPanel extends UIBaseComponent
{
	public override function draw(){
		root.renderer.rect();
	}
	
}